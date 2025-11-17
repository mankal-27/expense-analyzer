export async function aiCategorize(vendor, description = "", amount = 0) {
  const prompt = `
You are an expert financial transaction classifier.

Given a transaction vendor and description, return the best category from this list:
Food, Shopping, Groceries, Fuel, Travel, Bills, Entertainment, Health, Education, EMI, Digital Services, Cash Withdrawal, Income, Other.

Return ONLY the category. No explanation.

Vendor: ${vendor}
Description: ${description}
Amount: ${amount}
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",   // ⭐ REAL GROQ MODEL
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 20,
    }),
  });

  const data = await response.json();

  return data?.choices?.[0]?.message?.content?.trim() || "Other";
}
