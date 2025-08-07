import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../NavBar";

describe("NavBar component", () => {
  it("renders all nav links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText("Snack or Booze")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Snacks")).toBeInTheDocument();
    expect(screen.getByText("Drinks")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
