// src/utils/parseCSV.js
import { categorizeTransaction } from "./categorize";
import { aiCategorize } from "../hooks/useAICategorizer";

/**
 * Clean and parse raw date string into "YYYY-MM-DD" or return null if invalid.
 */
function safeParseDate(raw) {
  if (raw == null) return null;

  // remove BOM, CR, LF, and trim
  let clean = String(raw)
    .replace(/^\uFEFF/, "") // BOM
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .trim();

  if (!clean) return null;

  // Try direct Date parsing
  let d = new Date(clean);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  // YYYY/MM/DD or YYYY-MM-DD
  // Case 1: YYYY-MM-DD or YYYY/MM/DD
if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(clean)) {
  // Normalize separators → YYYY-MM-DD
  const [YYYY, MM, DD] = clean.replace(/\//g, "-").split("-");

  // Pad single-digit months/days
  const fixed = `${YYYY}-${MM.padStart(2, "0")}-${DD.padStart(2, "0")}`;

  const d = new Date(fixed);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
}


  // DD-MM-YYYY or DD/MM/YYYY -> convert to YYYY-MM-DD
  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(clean)) {
    const sep = clean.includes("/") ? "/" : "-";
    const [dd, mm, yyyy] = clean.split(sep);
    const fixed = `${yyyy}-${mm}-${dd}`;
    d = new Date(fixed);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  // Try fallback: swap parts if looks like MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(clean)) {
    const [a, b, c] = clean.split("/");
    // guess MM/DD/YYYY -> try both
    const try1 = new Date(`${c}-${a}-${b}`);
    if (!isNaN(try1.getTime())) return try1.toISOString().slice(0, 10);
    const try2 = new Date(`${c}-${b}-${a}`);
    if (!isNaN(try2.getTime())) return try2.toISOString().slice(0, 10);
  }

  console.warn("safeParseDate: invalid date format ->", raw);
  return null;
}

/**
 * Normalize parsed CSV rows into consistent transactions.
 * Input rows = array of objects from PapaParse (header:true)
 * Returns an array of { date, vendor, amount, type, category }
 */
export async function normalizeTransactions(rows, { useAI = true } = {}) {
  const cleaned = [];
  const useAICategorization = import.meta.env.MODE !== "production" && useAI;

  for (const row of rows) {
    // Skip fully empty rows
    if (!row || Object.values(row).every((v) => v === "" || v == null)) {
      continue;
    }

    // Extract raw date field candidates (common headers)
    const rawDate =
      row.DATE ??
      row["DATE "] ??
      row["VALUE DATE"] ??
      row["Value Date"] ??
      row["Transaction Date"] ??
      row["Date"] ??
      row["date"] ??
      "";

    const date = safeParseDate(rawDate);
    if (!date) {
      // Skip rows without a valid date
      console.warn("Skipping row - invalid date:", row);
      continue;
    }

    // Vendor/description fields (try common names)
    const vendor =
      (row["TRANSACTION DETAILS"] && String(row["TRANSACTION DETAILS"]).trim()) ||
      (row["Description"] && String(row["Description"]).trim()) ||
      (row["Narration"] && String(row["Narration"]).trim()) ||
      (row["Remarks"] && String(row["Remarks"]).trim()) ||
      "Unknown";

    // Amounts - banks often split debit/credit
    const rawDebit =
      row["WITHDRAWAL AMT"] ??
      row["Withdrawal Amount"] ??
      row["DEBIT"] ??
      row["Debit"] ??
      row["WITHDRAWAL"] ??
      row["Withdrawal"] ??
      "";

    const rawCredit =
      row["DEPOSIT AMT"] ??
      row["Deposit Amount"] ??
      row["CREDIT"] ??
      row["Credit"] ??
      row["DEPOSIT"] ??
      row["Deposit"] ??
      "";

    // Clean amount strings: remove commas, currency symbols, parentheses, negative signs
    const cleanNumber = (val) => {
      if (val == null || val === "") return 0;
      const s = String(val).replace(/[,\s₹()]/g, "").replace(/^-/, "");
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : 0;
    };

    const debit = cleanNumber(rawDebit);
    const credit = cleanNumber(rawCredit);

    const type = debit > 0 ? "debit" : "credit";
    const amount = debit > 0 ? debit : credit;

    // Skip zero-amount rows (no money moved)
    if (!amount || amount <= 0) {
      // sometimes balance-only lines or headings — skip
      continue;
    }

    // Rule-based category first
    let category = categorizeTransaction(vendor);
    

    // If uncategorized and AI allowed -> call AI fallback (await)
    if (useAICategorization && (category === "Uncategorized" || !category)) {
    // Only use AI for 5% to avoid rate limit
    if (Math.random() < 0.05) {
        try {
            const aiResult = await aiCategorize(vendor, "", amount);
            category = aiResult || "Other";
        } catch {
            category = "Other";
        }
    } else {
        category = "Other";
    }
}



    cleaned.push({
      date,
      vendor,
      amount,
      type,
      category,
    });
  }

  return cleaned;
}
