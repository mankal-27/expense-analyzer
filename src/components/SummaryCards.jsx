import { useExpenses } from "../context/ExpenseContext";

export default function SummaryCards() {
  const { transactions } = useExpenses();

  // total expenses (debits)
  const totalSpent = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  // total income (credits)
  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  // biggest category
  const categoryTotals = {};
  for (const t of transactions) {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  }

  const biggestCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const cards = [
    { title: "Total Spent", value: `₹${totalSpent.toLocaleString()}` },
    { title: "Total Income", value: `₹${totalIncome.toLocaleString()}` },
    { title: "Top Spending Category", value: biggestCategory },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="
            p-6
            bg-white 
            rounded-xl 
            border border-gray-200 
            shadow-sm 

            hover:shadow-md 
            hover:-translate-y-1 
            hover:border-gray-300
            transition-all
            duration-300 
            ease-out
          "
        >
          <p className="text-gray-500 text-sm">{card.title}</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {card.value}
          </h2>
        </div>
      ))}

    </div>
  );
}
