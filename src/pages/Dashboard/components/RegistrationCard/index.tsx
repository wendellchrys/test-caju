import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";
import { RegistrationUser } from "~/schemas/registrationUserSchema";

import * as S from "./styles";

type RegistrationCardProps = {
  data: RegistrationUser;
};

const RegistrationCard = ({ data }: RegistrationCardProps) => {
  const showApproveRejectButtons = data.status === "REVIEW";
  const showReviewAgainButton = ["REPROVED", "APPROVED"].includes(data.status);

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
            <ButtonSmall bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
            <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
          </>
        )}
        {showReviewAgainButton && (
          <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        )}
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
