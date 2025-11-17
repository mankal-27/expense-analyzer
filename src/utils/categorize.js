export function categorizeTransaction(vendor) {
  const v = vendor.toLowerCase();

  if (
    v.includes("zomato") ||
    v.includes("swiggy") ||
    v.includes("kfc") ||
    v.includes("mcd") ||
    v.includes("dominos")
  ) {
    return "Food";
  }

  if (
    v.includes("amazon") ||
    v.includes("flipkart") ||
    v.includes("myntra") ||
    v.includes("ajio")
  ) {
    return "Shopping";
  }

  if (
    v.includes("uber") ||
    v.includes("ola") ||
    v.includes("rapido") ||
    v.includes("indianoil") ||
    v.includes("hp petrol") ||
    v.includes("petrol")
  ) {
    return "Travel / Fuel";
  }

  if (
    v.includes("atm") ||
    v.includes("cash")
  ) {
    return "Cash Withdrawal";
  }

  if (
    v.includes("hospital") ||
    v.includes("clinic") ||
    v.includes("pharmacy") ||
    v.includes("medic")
  ) {
    return "Health";
  }

  if (
    v.includes("electricity") ||
    v.includes("bescom") ||
    v.includes("water") ||
    v.includes("gas") ||
    v.includes("reliance jio") ||
    v.includes("airtel") ||
    v.includes("vi recharge")
  ) {
    return "Bills";
  }

  if (
    v.includes("salary") ||
    v.includes("credited") ||
    v.includes("neft") ||
    v.includes("rtgs")
  ) {
    return "Income";
  }

  // fallback — AI will handle later
  return "Uncategorized";
}
