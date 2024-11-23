import styled from 'styled-components';

type ButtonProps = {
  $isSmall?: boolean;
  $bgColor?: string;
};

export const ButtonContainer = styled.button<ButtonProps>`
  padding: ${({ $isSmall }) => ($isSmall ? '4px 16px' : '8px 32px')};
  font-size: ${({ $isSmall }) => ($isSmall ? '12px' : '16px')};
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : '#64a98c')};
  color: ${({ $isSmall }) => ($isSmall ? 'inherit' : '#fff')};
  border: none;
  border-radius: ${({ $isSmall }) => ($isSmall ? '4px' : '36px')};
  cursor: pointer;
  font-weight: ${({ $isSmall }) => ($isSmall ? '400' : '600')};
  height: ${({ $isSmall }) => ($isSmall ? 'auto' : '56px')};
`;