import * as S from "./styles";

export const Loading = () => {
    return (
        <S.Overlay>
            <S.LoadingContainer>
                <S.Spinner data-testid="spinner" />
                <S.Title>Carregando...</S.Title>
            </S.LoadingContainer>
        </S.Overlay>
    );
};
