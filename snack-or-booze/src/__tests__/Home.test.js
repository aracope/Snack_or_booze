import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home component", () => {
  it("renders welcome message with correct snack and drink count", () => {
    render(<Home snacks={[{}, {}]} drinks={[{}]} />);
    expect(screen.getByText(/welcome to silicon valley/i)).toBeInTheDocument();
    expect(screen.getByText(/we have 2 snacks and 1 drinks/i)).toBeInTheDocument();
  });
});
