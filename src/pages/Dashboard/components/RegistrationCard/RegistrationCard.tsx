import { useState } from "react";
import {
    HiOutlineCalendar,
    HiOutlineMail,
    HiOutlineTrash,
    HiOutlineUser,
} from "react-icons/hi";

import { Button } from "~/components";
import { ConfirmationModal } from "~/components/ConfirmationModal";
import { useDeleteRegistration } from "~/hooks/useDeleteRegistration";
import { useUpdateStatus } from "~/hooks/useUpdateStatus";
import { RegistrationUser } from "~/schemas/registrationUserSchema";

import * as S from "./styles";

type RegistrationCardProps = {
    data: RegistrationUser;
};

type Status = "REVIEW" | "REPROVED" | "APPROVED";

export const RegistrationCard = ({ data }: RegistrationCardProps) => {
    const { updateStatus, isLoading: isUpdating } = useUpdateStatus();
    const { deleteRegistration, isDeleting } = useDeleteRegistration();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<() => void>(() => () => { });

    const showApproveRejectButtons = data.status === "REVIEW";
    const showReviewAgainButton = ["REPROVED", "APPROVED"].includes(data.status);

    const handleUpdateStatus = (newStatus: Status) => {
        setModalAction(() => () => updateStatus({ ...data }, newStatus));
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        setModalAction(() => () => deleteRegistration(data.id));
        setIsModalOpen(true);
    };

    return (
        <S.Card>
            <S.IconAndText>
                <HiOutlineUser />
                <h3>{data.employeeName}</h3>
            </S.IconAndText>
            <S.IconAndText>
                <HiOutlineMail />
                <p>{data.email}</p>
            </S.IconAndText>
            <S.IconAndText>
                <HiOutlineCalendar />
                <span>{data.admissionDate}</span>
            </S.IconAndText>
            <S.Actions>
                {showApproveRejectButtons && (
                    <>
                        <Button
                            isSmall
                            bgColor="rgb(255, 145, 154)"
                            onClick={() => handleUpdateStatus("REPROVED")}
                            disabled={isUpdating || isDeleting}
                        >
                            Reprovar
                        </Button>
                        <Button
                            isSmall
                            bgColor="rgb(155, 229, 155)"
                            onClick={() => handleUpdateStatus("APPROVED")}
                            disabled={isUpdating || isDeleting}
                        >
                            Aprovar
                        </Button>
                    </>
                )}
                {showReviewAgainButton && (
                    <Button
                        isSmall
                        bgColor="#ff8858"
                        onClick={() => handleUpdateStatus("REVIEW")}
                        disabled={isUpdating || isDeleting}
                    >
                        Revisar novamente
                    </Button>
                )}
                <HiOutlineTrash
                    onClick={handleDelete}
                    style={{ cursor: isDeleting ? "not-allowed" : "pointer" }}
                    data-testid="trash-icon"
                />
            </S.Actions>

            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirmação"
                message="Tem certeza que deseja executar esta ação?"
                confirmText="Sim"
                cancelText="Não"
                onConfirm={() => {
                    setIsModalOpen(false);
                    modalAction();
                }}
                onCancel={() => setIsModalOpen(false)}
                isLoading={isUpdating || isDeleting}
            />
        </S.Card>
    );
};
