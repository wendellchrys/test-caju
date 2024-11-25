import { RegistrationUser } from "~/schemas/registrationUser";

import { RegistrationCard } from "../RegistrationCard";
import * as S from "./styles";

const allCollumns = [
    { status: 'REVIEW', title: "Pronto para revisar" },
    { status: 'APPROVED', title: "Aprovado" },
    { status: 'REPROVED', title: "Reprovado" },
];

type ColumnsProps = {
    registrations: RegistrationUser[];
};

export const Columns = ({ registrations }: ColumnsProps) => {
    return (
        <S.Container>
            {allCollumns.map((column) => {
                const columnRegistrations = registrations.filter(
                    (registration) => registration.status === column.status
                );

                return (
                    <S.Column status={column.status} key={column.title}>
                        <>
                            <S.TitleColumn status={column.status}>
                                {column.title}
                            </S.TitleColumn>
                            <S.CollumContent>
                                {columnRegistrations.map((registration) => (
                                    <RegistrationCard
                                        data={registration}
                                        key={registration.id}
                                    />
                                ))}
                            </S.CollumContent>
                        </>
                    </S.Column>
                );
            })}
        </S.Container>
    );
};
