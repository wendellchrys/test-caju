import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

import { useStatusUpdateContext } from "~/contexts/statusUpdateContext";

import DashboardPage from ".";

jest.mock("axios");
jest.mock("react-hot-toast");
jest.mock("~/contexts/statusUpdateContext");
jest.mock("./components/Columns", () => ({
    __esModule: true,
    Columns: jest.fn(({ registrations }: { registrations: any[] }) => {
        return (
            <div>
                {registrations.map((r) => (
                    <div key={r.id} data-testid="registration-item">
                        {r.employeeName}
                    </div>
                ))}
            </div>
        );
    }),
}));
jest.mock("./components/Searchbar", () => ({
    __esModule: true,
    SearchBar: jest.fn(({ handleSearch, handleRefresh }) => (
        <div>
            <input
                placeholder="Digite um CPF válido"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button aria-label="refetch" onClick={handleRefresh}>
                Refresh
            </button>
        </div>
    )),
}));

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockUseStatusUpdateContext = useStatusUpdateContext as jest.Mock;

describe("Pages:: DashboardPage", () => {
    const mockRegistrations = [
        { id: "1", employeeName: "John Doe", cpf: "123.456.789-09", status: "REVIEW" },
        { id: "2", employeeName: "Jane Smith", cpf: "987.654.321-00", status: "APPROVED" },
    ];

    beforeEach(() => {
        mockAxios.get.mockResolvedValue({ data: mockRegistrations });
        mockUseStatusUpdateContext.mockReturnValue({ lastUpdated: "2024-01-01T00:00:00.000Z" });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render loading initially", async () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Carregando...")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByText("Carregando...")).not.toBeInTheDocument());
    });

    it("Should render search bar and columns with registrations", async () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.queryByText("Carregando...")).not.toBeInTheDocument());
        expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();

    });
});
