import React, { FormEvent, useState } from "react";
import Modal from "react-modal";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onHandleCloseNewTransaction: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onHandleCloseNewTransaction,
}) => {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    if (type === "" || amount === 0 || title === "" || category === "") {
      window.alert("Dados inválidos, preencha-os corretamente");
      return;
    }

    await createTransaction({
      type,
      amount,
      title,
      category,
    });

    setType("deposit");
    setTitle("");
    setAmount(0);
    setCategory("");

    onHandleCloseNewTransaction();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onHandleCloseNewTransaction}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <button
          className="react-modal-close"
          type="button"
          onClick={onHandleCloseNewTransaction}
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Cadastrar </button>
      </Container>
    </Modal>
  );
};
