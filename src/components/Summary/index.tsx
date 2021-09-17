import React from "react";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export const Summary: React.FC = () => {
  const { calculateTotal } = useTransactions();

  const resume = calculateTotal();

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(resume.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{`${
          resume.withdraw === 0
            ? "R$ 0,00"
            : new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(-resume.withdraw)
        }`}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(resume.total)}
        </strong>
      </div>
    </Container>
  );
};
