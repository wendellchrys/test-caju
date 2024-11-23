import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import { Loading } from "./Loading";

describe("Components:: Loading", () => {
    it("Should render the loading spinner and text", () => {
        render(<Loading />);
        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });
});
