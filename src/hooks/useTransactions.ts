import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export const useTransactions = () => {
  const transactionsContext = useContext(TransactionsContext);
  return transactionsContext;
};
