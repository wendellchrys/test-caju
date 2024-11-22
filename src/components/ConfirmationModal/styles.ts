import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 1.5rem;
`;

export const Message = styled.p`
  margin: 0 0 20px;
  font-size: 1rem;
  color: #555;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const CancelButton = styled.button`
  background: #ccc;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  font-size: 1rem;
  flex: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    background: #bbb;
  }
`;

export const ConfirmButton = styled.button`
  background: #ff5555;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  flex: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    background: #ff3333;
  }
`;
