import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useExpenses } from "../context/ExpenseContext";

// Apple-style muted color palette
const COLORS = [
  "#0f766e", // muted teal (highlight)
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#e5e7eb",
  "#374151",
];

export default function CategoryChart() {
  const { transactions } = useExpenses();

  // -----------------------------
  // 1. GROUP DATA BY CATEGORY
  // -----------------------------
  const categoryTotals = transactions.reduce((acc, t) => {
    if (t.type === "credit") return acc; // don't include income in spending chart
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  // If nothing to show
  if (data.length === 0) {
    return <p className="text-gray-500">No spending data available.</p>;
  }

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width={500} height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"     // <-- makes donut chart
            outerRadius="90%"
            dataKey="value"
            paddingAngle={3}
          >
            {/* -----------------------------
                2. COLOR EACH SLICE
               ----------------------------- */}
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="white"
                strokeWidth={1}
              />
            ))}
          </Pie>

          {/* -----------------------------
              3. TOOLTIP (APPLE-LIKE)
             ----------------------------- */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value) =>
              `₹${value.toLocaleString()}`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
