import * as S from "./styles";

export const Loading = () => {
    return (
        <S.Overlay>
            <S.LoadingContainer>
                <S.Spinner />
                <S.Title>Carregando...</S.Title>
            </S.LoadingContainer>
        </S.Overlay>
    );
};
