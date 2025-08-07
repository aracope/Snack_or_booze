import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ItemDetails from "../ItemDetails";

const snacks = [
  {
    id: "popcorn",
    name: "Popcorn",
    description: "Tasty popped corn.",
    recipe: "Pop in oil.",
    serve: "In a bowl.",
  },
];

describe("ItemDetails component", () => {
  it("renders item details when item is found", () => {
    render(
      <MemoryRouter initialEntries={["/snacks/popcorn"]}>
        <Route path="/snacks/:id">
          <ItemDetails items={snacks} cantFind="/snacks" />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText("Popcorn")).toBeInTheDocument();
    expect(screen.getByText("Tasty popped corn.")).toBeInTheDocument();
    expect(screen.getByText(/Pop in oil/)).toBeInTheDocument();
    expect(screen.getByText(/In a bowl/)).toBeInTheDocument();
  });

  it("redirects if item is not found", () => {
    render(
      <MemoryRouter initialEntries={["/snacks/nonexistent"]}>
        <Route path="/snacks/:id">
          <ItemDetails items={snacks} cantFind="/snacks" />
        </Route>
      </MemoryRouter>
    );

    expect(screen.queryByText("Popcorn")).not.toBeInTheDocument();
  });
});
