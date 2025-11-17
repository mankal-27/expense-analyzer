# 🧾 Expense Analyzer — Smart CSV-Based Financial Dashboard

A modern, privacy-friendly **bank statement analyzer** built using **React + Vite + TailwindCSS**.  
Upload CSV bank statements and instantly visualize expenses, income patterns, categories, and trends.  
Works for all major Indian banks (SBI, HDFC, ICICI, Axis, Kotak, Federal Bank, etc.)

🔗 **Live Demo:**  
https://mankal-27.github.io/expense-analyzer/#/

---

## 🚀 Features

- 📤 **Upload CSV bank statements**
- 🔍 **Rule-based categorization** (Food, Travel, Shopping, Bills, Groceries, Fuel, Income, etc.)
- 🤖 **Optional AI categorization using Groq** (enabled in development only)
- 📊 **Visual Dashboards**
  - Category Pie Chart
  - Monthly Spending Bar Chart
  - Daily Spending Trend Line
- 💵 **Smart Summary Cards**
- 📑 **Clean Transactions Table**
- 🧾 **One-click PDF Export**
- 🔒 **0% data storage** — Everything stays in your browser
- ⚡ **Blazing-fast Vite build**
- 🎨 Minimal Apple-style UI using TailwindCSS
- 🚀 **Automatic Deployment to GitHub Pages** via GitHub Actions

---

## 🛠 Tech Stack

| Area | Technology |
|------|------------|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| CSV Parsing | PapaParse |
| PDF Export | html2canvas-pro + jsPDF |
| AI (optional) | Groq API |
| Deployment | GitHub Pages + GitHub Actions |
| Routing | React Router (HashRouter) |

---

## 📂 Project Structure




---

## ⚙️ Installation

Clone the repo:

```bash
git clone https://github.com/mankal-27/expense-analyzer.git
cd expense-analyzer
npm install

```
Run development server:
```
npm run dev
```

Build production bundle:
```
npm run build
```

🔐 Environment Variables

Create a .env file:
```
VITE_GROQ_API_KEY=your_api_key_here
```
⚠️ AI categorization is disabled in production to avoid exposing keys.

🧾 PDF Export

Click Download PDF Report on the dashboard to generate a full A4 PDF including:

Summary Cards

Category Chart

Monthly Trends

Daily Trends

Complete Transactions Table

Saved as: expense-report.pdf
