import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = {
    isSmall?: boolean;
    bgColor?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ isSmall, bgColor, children, ...props }) => {
    return (
        <S.ButtonContainer $isSmall={isSmall} $bgColor={bgColor} {...props}>
            {children}
        </S.ButtonContainer>
    );
};
