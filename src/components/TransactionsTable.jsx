import React from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function TransactionTable() {
  const { transactions } = useExpenses();

  if (transactions.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No transactions found.</p>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* Sticky header */}
      <div className="overflow-auto max-h-[400px]">
        <table className="min-w-full text-sm">
          
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Vendor</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Amount</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Type</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, index) => (
              <tr
                key={index}
                className={`
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  border-b border-gray-100
                `}
              >
                {/* Date */}
                <td className="px-4 py-3 text-gray-800">
                  {new Date(t.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* Vendor */}
                <td className="px-4 py-3 text-gray-700">{t.vendor}</td>

                {/* Category */}
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border">
                    {t.category}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    t.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{t.amount.toLocaleString()}
                </td>

                {/* Type */}
                <td className="px-4 py-3 text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.type === "credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type === "credit" ? "Income" : "Expense"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
