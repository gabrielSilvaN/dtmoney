import React from "react";
import Logo from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface IHeaderProps {
  onOpenNewTransactionModal: () => void;
}

export const Header: React.FC<IHeaderProps> = ({
  onOpenNewTransactionModal,
}) => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
