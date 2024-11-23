import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import { RegistrationUser } from "~/schemas/registrationUser";

import { Columns } from ".";

jest.mock("../RegistrationCard", () => ({
    __esModule: true,
    RegistrationCard: ({ data }: { data: RegistrationUser }) => (
        <div data-testid="registration-card">
            <span>{data.employeeName}</span>
        </div>
    ),
}));

describe("Components:: Columns", () => {
    const mockRegistrations: RegistrationUser[] = [
        { id: "1", cpf: "42296116337", employeeName: "Nome1 Sobrenome1", email: "nome@dominio.com", admissionDate: "2021-01-01", status: "REVIEW" },
        { id: "2", cpf: "42296116337", employeeName: "Nome2 Sobrenome2", email: "nome2@dominio.com", admissionDate: "2021-02-01", status: "APPROVED" },
        { id: "3", cpf: "42296116337", employeeName: "Nome3 Sobrenome3", email: "nome3@dominio.com", admissionDate: "2021-03-01", status: "REPROVED" },
    ];

    it("Should render columns with correct titles", () => {
        render(<Columns registrations={mockRegistrations} />);

        expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
        expect(screen.getByText("Aprovado")).toBeInTheDocument();
        expect(screen.getByText("Reprovado")).toBeInTheDocument();
    });

    it("Should render registration cards in the correct columns", () => {
        render(<Columns registrations={mockRegistrations} />);

        const reviewColumn = screen.getByText("Pronto para revisar").closest("div");
        const approvedColumn = screen.getByText("Aprovado").closest("div");
        const reprovedColumn = screen.getByText("Reprovado").closest("div");

        expect(reviewColumn).toHaveTextContent("Nome1 Sobrenome1");
        expect(approvedColumn).toHaveTextContent("Nome2 Sobrenome2");
        expect(reprovedColumn).toHaveTextContent("Nome3 Sobrenome3");
    });

    it("Should render no registration cards if no registrations are provided", () => {
        render(<Columns registrations={[]} />);

        expect(screen.queryByTestId("registration-card")).not.toBeInTheDocument();
    });
});
