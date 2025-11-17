import React from "react";
import SummaryCards from "../components/SummaryCards";
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
import DailyChart from "../components/DailyChart";
import TransactionTable from "../components/TransactionsTable";
import PDFView from "../components/PDFView";
import { downloadPDF } from "../utils/exportPDF";

export default function DashboardPage() {
  return (
    <div className="px-6 py-10">

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="mb-6 px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
      >
        Download PDF Report
      </button>

      {/* Normal dashboard UI */}
      <SummaryCards />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <CategoryChart />
        <MonthlyChart />
      </div>

      <div className="mt-6">
        <DailyChart />
      </div>

      <div className="mt-6">
        <TransactionTable />
      </div>

      {/* Hidden PDF-only version */}
      <div
  style={{
    position: "absolute",
    top: "-9999px",
    left: "-9999px",
    width: "1100px",
  }}
>
  <PDFView />
</div>

    </div>
  );
}
