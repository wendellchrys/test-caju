import '@testing-library/jest-dom';

import { fireEvent, render, screen } from "@testing-library/react";

import { ConfirmationModal } from ".";

describe("Components:: ConfirmationModal", () => {
    const defaultProps = {
        isOpen: true,
        title: "Confirmar Ação",
        message: "Você tem certeza que deseja continuar?",
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
    };

    it("Should not render when isOpen is false", () => {
        render(<ConfirmationModal {...defaultProps} isOpen={false} />);
        expect(screen.queryByText("Confirmar Ação")).not.toBeInTheDocument();
    });

    it("Should render title and message when isOpen is true", () => {
        render(<ConfirmationModal {...defaultProps} />);
        expect(screen.getByText("Confirmar Ação")).toBeInTheDocument();
        expect(screen.getByText("Você tem certeza que deseja continuar?")).toBeInTheDocument();
    });

    it("Should render default confirm and cancel texts", () => {
        render(<ConfirmationModal {...defaultProps} />);
        expect(screen.getByText("Confirmar")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    it("Should call onConfirm when confirm button is clicked", () => {
        render(<ConfirmationModal {...defaultProps} />);
        fireEvent.click(screen.getByText("Confirmar"));
        expect(defaultProps.onConfirm).toHaveBeenCalled();
    });

    it("Should call onCancel when cancel button is clicked", () => {
        render(<ConfirmationModal {...defaultProps} />);
        fireEvent.click(screen.getByText("Cancelar"));
        expect(defaultProps.onCancel).toHaveBeenCalled();
    });

    it("Should display loading text when isLoading is true", () => {
        render(<ConfirmationModal {...defaultProps} isLoading={true} />);
        expect(screen.getByText("Processando...")).toBeInTheDocument();
        expect(screen.getByText("Cancelar")).toBeDisabled();
    });
});
