import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // this will store all parsed transactions (in memory)
  const [transactions, setTransactions] = useState([]);

  return (
    <ExpenseContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
