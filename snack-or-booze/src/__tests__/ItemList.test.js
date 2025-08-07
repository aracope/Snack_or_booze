import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ItemList from "../ItemList";

describe("ItemList component", () => {
  const testItems = [
    { id: "popcorn", name: "Popcorn" },
    { id: "pretzels", name: "Pretzels" },
  ];

  it("renders items correctly", () => {
    render(
      <MemoryRouter>
        <ItemList items={testItems} title="Snacks" baseUrl="snacks" />
      </MemoryRouter>
    );

    expect(screen.getByText("Snacks Menu")).toBeInTheDocument();
    expect(screen.getByText("Popcorn")).toBeInTheDocument();
    expect(screen.getByText("Pretzels")).toBeInTheDocument();
  });
});
