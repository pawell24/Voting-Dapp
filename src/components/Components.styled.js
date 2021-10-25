import styled, { createGlobalStyle } from "styled-components";

export const StyledHeader = styled.header`
  width: 100vw;
  height: 10vh;
  background-color: white;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
export const Button = styled.button`
  background-color: white;
  border: 2px solid #4467fc;
  margin-right: 20px;
  font-size: 17px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: #4467fc;
    color: white;
    transition: 0.3s;
  }
`;

export const StyledDiv = styled.div`
  border: 2px solid #4467fc;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
`;
export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  box-sizing: border-box;
}
`;
