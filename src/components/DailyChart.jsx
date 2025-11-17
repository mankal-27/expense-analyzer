import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";

export default function DailyChart() {
  const { transactions } = useExpenses();

  const dailyTotals = {};

  transactions.forEach((t) => {
    if (t.type === "credit") return;
    dailyTotals[t.date] = (dailyTotals[t.date] || 0) + t.amount;
  });

  const data = Object.entries(dailyTotals).map(([date, total]) => ({
    date,
    total,
  }));

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // ❗ STOP RENDERING CHART WHEN ONLY 0–1 POINTS
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-[200px] text-gray-500">
        Not enough daily data to draw a trend line.
      </div>
    );
  }

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width={500} height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => str.slice(8)}
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

          <defs>
            <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="total"
            stroke="url(#lineColor)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
