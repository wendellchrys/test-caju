import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import { Header } from '.';

describe("Components:: Header", () => {
    it("Should render the header with correct text", () => {
        render(<Header />);
        expect(screen.getByText("Caju Front Teste")).toBeInTheDocument();
        expect(screen.getByText("Modificado por Wendell Christian")).toBeInTheDocument();
    });
});
