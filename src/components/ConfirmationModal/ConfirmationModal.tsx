import * as S from "./styles";

type ConfirmationModalProps = {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const ConfirmationModal = ({
    isOpen,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    isLoading = false,
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <S.Overlay>
            <S.Modal>
                <S.Title>{title}</S.Title>
                <S.Message>{message}</S.Message>
                <S.Actions>
                    <S.CancelButton onClick={onCancel} disabled={isLoading}>
                        {cancelText}
                    </S.CancelButton>
                    <S.ConfirmButton onClick={onConfirm} disabled={isLoading} >
                        {isLoading ? "Processando..." : confirmText}
                    </S.ConfirmButton>
                </S.Actions>
            </S.Modal>
        </S.Overlay>
    );
};
