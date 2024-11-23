import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import { MemoryRouter } from 'react-router-dom';

import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";
import { RegistrationUser } from "~/schemas/registrationUser";

import DashboardPage from ".";

// Mock de axios e toast
jest.mock("axios");
jest.mock("react-hot-toast");
jest.mock("~/contexts/statusUpdateContext");

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockToast = toast as jest.Mocked<typeof toast>;
const mockUseStatusUpdateContext = useStatusUpdateContext as jest.Mock;

describe("Pages:: DashboardPage", () => {
    const mockRegistrations: RegistrationUser[] = [
        {
            id: "1",
            employeeName: "John Doe",
            email: "john@example.com",
            admissionDate: "2021-01-01",
            status: "REVIEW",
            cpf: "123.456.789-09",
        },
        {
            id: "2",
            employeeName: "Jane Smith",
            email: "jane@example.com",
            admissionDate: "2021-02-01",
            status: "APPROVED",
            cpf: "987.654.321-00",
        },
    ];

    beforeEach(() => {
        mockAxios.get.mockResolvedValue({ data: mockRegistrations });
        mockUseStatusUpdateContext.mockReturnValue({ lastUpdated: new Date().toISOString() });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render the loading state initially", async () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Carregando...")).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText("Carregando...")).not.toBeInTheDocument());
    });

    it("Should render the search bar and columns correctly after loading", async () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.queryByText("Carregando...")).not.toBeInTheDocument());

        expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
        expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
        expect(screen.getByText("Aprovado")).toBeInTheDocument();
        expect(screen.getByText("Reprovado")).toBeInTheDocument();
    });

    it("Should call handleSearch and filter registrations correctly", async () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.queryByText("Carregando...")).not.toBeInTheDocument());

        const input = screen.getByPlaceholderText("Digite um CPF válido");
        fireEvent.change(input, { target: { value: '123.456.789-09' } });

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });

    it("Should call handleRefresh and fetch registrations again", async () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.queryByText("Carregando...")).not.toBeInTheDocument());

        const refreshButton = screen.getByLabelText('refetch');
        fireEvent.click(refreshButton);

        await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(2));
    });

    it("Should show error toast when fetching registrations fails", async () => {
        mockAxios.get.mockRejectedValueOnce(new Error("Erro ao buscar registros."));
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        await waitFor(() => expect(mockToast.error).toHaveBeenCalledWith("Erro ao buscar registros."));
    });
});
