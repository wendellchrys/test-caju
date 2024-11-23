import '@testing-library/jest-dom';

import { fireEvent, render, screen } from "@testing-library/react";

import { TextField } from "./TextField";

describe("Components:: TextField", () => {
    it("Should render the label when provided", () => {
        render(<TextField label="Nome" />);
        expect(screen.getByText("Nome")).toBeInTheDocument();
    });

    it("Should render the error message when provided", () => {
        render(<TextField error="Campo obrigatório" />);
        expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });

    it("Should render the clear button when clearable and value is provided", () => {
        const handleChange = jest.fn();
        render(<TextField clearable value="test" onChange={handleChange} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it("Should call onClear when the clear button is clicked", () => {
        const handleClear = jest.fn();
        const handleChange = jest.fn();
        render(<TextField clearable value="test" onClear={handleClear} onChange={handleChange} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it("Should not render the clear button when clearable is false", () => {
        const handleChange = jest.fn();
        render(<TextField value="test" onChange={handleChange} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it("Should not render the clear button when there is no value", () => {
        render(<TextField clearable />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
