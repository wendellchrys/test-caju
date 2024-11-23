import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import { Button } from ".";

describe("Components:: Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole("button"));
    expect(screen.getByText("Ativar")).toBeInTheDocument();
  });
});
