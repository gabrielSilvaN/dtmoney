import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsContextProvider } from "./contexts/TransactionsContext";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Website",
          type: "deposit",
          category: "dev",
          amount: 6000,
          createdAt: new Date("2021-09-14 15:17:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      const dataToSave = {
        ...data,
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
      };

      return schema.create("transaction", dataToSave);
    });
  },
});

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <TransactionsContextProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

        <Dashboard />

        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onHandleCloseNewTransaction={handleCloseNewTransactionModal}
        />
      </TransactionsContextProvider>

      <GlobalStyle />
    </>
  );
}
