import styled from "styled-components";
import { darken, transparentize } from "polished";

interface RadioBoxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

const colors = {
  green: "#33cc95",
  red: "#e52e4d",
};

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    background-color: #e7e9ee;
    border: 1px solid #d7d7d7;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: var(--green);
    margin-top: 1.5rem;
    border: 0;
    border-radius: 0.25rem;
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RadioBox = styled.button<RadioBoxProps>`
  flex: 1;
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.isActive ? transparentize(0.9, colors[props.activeColor]) : "transparent"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }

  &:hover {
    border-color: ${darken(0.1, "#d7d7d7")};
  }

  & + button {
    margin-left: 0.5rem;
  }
`;
