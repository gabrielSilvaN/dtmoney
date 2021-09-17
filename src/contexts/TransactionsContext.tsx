import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface ITransaction {
  amount: number;
  category: string;
  createdAt: string;
  title: string;
  type: string;
  id: number;
}

// interface ICreateTransaction {
//   amount: number;
//   category: string;
//   title: string;
//   type: string;
// }

// ou então

type ICreateTransaction = Omit<ITransaction, "id" | "createdAt">;

export interface IResume {
  deposits: number;
  withdraw: number;
  total: number;
}

interface TransactionContextProps {
  transactions: ITransaction[];
  createTransaction: (data: ICreateTransaction) => Promise<void>;
  calculateTotal: () => IResume;
}

export const TransactionsContext = createContext({} as TransactionContextProps);

export const TransactionsContextProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction: ICreateTransaction) {
    const result = await api.post("/transactions", transaction);
    setTransactions([...transactions, result.data.transaction]);
  }

  function calculateTotal() {
    return transactions.reduce(
      (acc, current) => {
        if (current.type === "deposit") {
          acc.deposits += current.amount;
          acc.total += current.amount;
        } else {
          acc.withdraw += current.amount;
          acc.total -= current.amount;
        }

        return acc;
      },
      {
        deposits: 0,
        withdraw: 0,
        total: 0,
      }
    );
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, calculateTotal }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
