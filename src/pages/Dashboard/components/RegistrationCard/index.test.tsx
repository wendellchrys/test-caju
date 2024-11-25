import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useDeleteRegistration } from "~/hooks/useDeleteRegistration";
import { useUpdateStatus } from "~/hooks/useUpdateStatus";
import { RegistrationUser } from "~/schemas/registrationUser";

import { RegistrationCard } from ".";

jest.mock("~/hooks/useDeleteRegistration");
jest.mock("~/hooks/useUpdateStatus");

const mockDeleteRegistration = jest.fn();
const mockUpdateStatus = jest.fn();

const mockUseDeleteRegistration = useDeleteRegistration as jest.Mock;
const mockUseUpdateStatus = useUpdateStatus as jest.Mock;

describe("Components:: RegistrationCard", () => {
    const mockRegistration: RegistrationUser = {
        id: "1",
        cpf: "96120683488",
        employeeName: "Nome Sobrenome",
        email: "nome@dominio.com",
        admissionDate: "2021-01-01",
        status: "REVIEW",
    };

    beforeEach(() => {
        mockUseDeleteRegistration.mockReturnValue({
            deleteRegistration: mockDeleteRegistration,
            isDeleting: false,
        });
        mockUseUpdateStatus.mockReturnValue({
            updateStatus: mockUpdateStatus,
            isLoading: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render registration details correctly", () => {
        render(<RegistrationCard data={mockRegistration} />);
        expect(screen.getByText("Nome Sobrenome")).toBeInTheDocument();
        expect(screen.getByText("nome@dominio.com")).toBeInTheDocument();
        expect(screen.getByText("2021-01-01")).toBeInTheDocument();
    });

    it("Should show approve and reject buttons when status is REVIEW", () => {
        render(<RegistrationCard data={mockRegistration} />);
        expect(screen.getByText("Reprovar")).toBeInTheDocument();
        expect(screen.getByText("Aprovar")).toBeInTheDocument();
    });

    it("Should call updateStatus with REPROVED when Reprovar button is clicked", async () => {
        render(<RegistrationCard data={mockRegistration} />);
        fireEvent.click(screen.getByText("Reprovar"));
        fireEvent.click(screen.getByText("Sim"));

        await waitFor(() => {
            expect(mockUpdateStatus).toHaveBeenCalledWith({ ...mockRegistration }, "REPROVED");
        });
    });

    it("Should call updateStatus with APPROVED when Aprovar button is clicked", async () => {
        render(<RegistrationCard data={mockRegistration} />);
        fireEvent.click(screen.getByText("Aprovar"));
        fireEvent.click(screen.getByText("Sim"));

        await waitFor(() => {
            expect(mockUpdateStatus).toHaveBeenCalledWith({ ...mockRegistration }, "APPROVED");
        });
    });

    it("Should call updateStatus with REVIEW when Revisar novamente button is clicked", async () => {
        const mockRegistrationApproved: RegistrationUser = {
            ...mockRegistration,
            status: "APPROVED",
        };
        render(<RegistrationCard data={mockRegistrationApproved} />);
        fireEvent.click(screen.getByText("Revisar novamente"));
        fireEvent.click(screen.getByText("Sim"));

        await waitFor(() => {
            expect(mockUpdateStatus).toHaveBeenCalledWith({ ...mockRegistrationApproved }, "REVIEW");
        });
    });


    it("Should call deleteRegistration when trash icon is clicked", async () => {
        render(<RegistrationCard data={mockRegistration} />);
        fireEvent.click(screen.getByTestId('trash-icon'));
        fireEvent.click(screen.getByText("Sim"));

        await waitFor(() => {
            expect(mockDeleteRegistration).toHaveBeenCalledWith(mockRegistration.id);
        });
    });
});
