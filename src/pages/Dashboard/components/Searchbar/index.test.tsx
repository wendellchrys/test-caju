import '@testing-library/jest-dom';

import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { SearchBar } from ".";

jest.mock("~/utils", () => ({
    maskCpf: jest.fn((value) => value),
    validateCpf: jest.fn(() => true),
}));

describe("Components:: SearchBar", () => {
    const handleSearch = jest.fn();
    const handleRefresh = jest.fn();
    const history = createMemoryHistory();

    beforeEach(() => {
        handleSearch.mockClear();
        handleRefresh.mockClear();
    });

    it("Should render the search bar correctly", () => {
        render(
            <Router history={history}>
                <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />
            </Router>
        );

        expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Nova Admissão/i })).toBeInTheDocument();
        expect(screen.getByLabelText('refetch')).toBeInTheDocument();
    });

    it("Should call handleSearch with valid CPF", () => {
        render(
            <Router history={history}>
                <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />
            </Router>
        );

        const input = screen.getByPlaceholderText("Digite um CPF válido");
        fireEvent.change(input, { target: { value: '123.456.789-09' } });

        expect(handleSearch).toHaveBeenCalledWith('12345678909');
    });

    it("Should call handleRefresh when clear button is clicked", () => {
        render(
            <Router history={history}>
                <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />
            </Router>
        );

        const input = screen.getByPlaceholderText("Digite um CPF válido");
        fireEvent.change(input, { target: { value: '123.456.789-09' } });

        const clearButton = screen.getByTestId('clear');
        fireEvent.click(clearButton);

        expect(handleRefresh).toHaveBeenCalled();
        expect(input).toHaveValue('');
    });

    it("Should call handleRefresh when refresh button is clicked", () => {
        render(
            <Router history={history}>
                <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />
            </Router>
        );

        const refreshButton = screen.getByLabelText('refetch');
        fireEvent.click(refreshButton);

        expect(handleRefresh).toHaveBeenCalled();
    });

    it("Should navigate to new admission page when Nova Admissão button is clicked", () => {
        render(
            <Router history={history}>
                <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />
            </Router>
        );

        const newAdmissionButton = screen.getByRole('button', { name: /Nova Admissão/i });
        fireEvent.click(newAdmissionButton);

        expect(history.location.pathname).toBe('/new-user');
    });
});
