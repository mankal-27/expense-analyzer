import React from "react";
import SummaryCards from "./SummaryCards";
import CategoryChart from "./CategoryChart";
import MonthlyChart from "./MonthlyChart";
import DailyChart from "./DailyChart";
import TransactionTable from "./TransactionsTable";

export default function PDFView() {
  return (
    <div
      id="pdf-export"
      style={{
        width: "1100px",
        minHeight: "1800px",
        padding: "40px",
        background: "white",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-black">Expense Report</h1>

      <SummaryCards />

      <div style={{ display: "flex", gap: "30px", marginTop: "40px" }}>
        <CategoryChart />
        <MonthlyChart />
      </div>

      <div style={{ marginTop: "40px" }}>
        <DailyChart />
      </div>

      <div style={{ marginTop: "40px" }}>
        <TransactionTable />
      </div>
    </div>
  );
}
