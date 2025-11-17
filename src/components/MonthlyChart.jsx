import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";

export default function MonthlyChart() {
  const { transactions } = useExpenses();

  const monthlyTotals = {};

  transactions.forEach((t) => {
    if (t.type === "credit") return;
    const date = new Date(t.date);
    const monthKey = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + t.amount;
  });

  const data = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  data.sort((a, b) => new Date(a.month) - new Date(b.month));

  // ❗ IMPORTANT FIX — Stop rendering charts when < 2 points
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-[200px] text-gray-500">
        Not enough monthly spending data to show trends.
      </div>
    );
  }

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width={500} height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />

          <Bar
            dataKey="total"
            fill="#0f766e"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
