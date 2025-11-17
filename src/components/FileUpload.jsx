// src/components/FileUpload.jsx
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../context/ExpenseContext";
import { normalizeTransactions } from "../utils/parseCSV";

export default function FileUpload() {
  const navigate = useNavigate();
  const { setTransactions } = useExpenses();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        try {
        
          // pass option {useAI:false} to disable AI during testing
          const cleaned = await normalizeTransactions(result.data, { useAI: true });
          
          setTransactions(cleaned);
          // slight delay so console logs show before navigation
          setTimeout(() => navigate("/dashboard"), 200);
        } catch (err) {
          console.error("Failed to normalize CSV:", err);
        }
      },
      error: (err) => {
        console.error("PapaParse error:", err);
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <label className="block text-center text-gray-700 mb-4">
        Select a CSV file from your bank statement
      </label>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
