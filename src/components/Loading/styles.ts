import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  width: 90%;
  padding: 20px;
  text-align: center;
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3; 
  border-top: 4px solid rgb(255, 117, 0);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  color: #fff;
`;
