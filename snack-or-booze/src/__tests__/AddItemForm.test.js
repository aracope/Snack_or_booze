import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddItemForm from "../AddItemForm";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import SnackOrBoozeApi from "../Api";

jest.mock("../Api");

describe("AddItemForm component", () => {
  it("submits new snack and redirects", async () => {
    const mockSetSnacks = jest.fn();
    const mockSetDrinks = jest.fn();
    const history = createMemoryHistory();
    SnackOrBoozeApi.addItem.mockResolvedValue({ id: "chips", name: "Chips" });

    render(
      <Router history={history}>
        <AddItemForm setSnacks={mockSetSnacks} setDrinks={mockSetDrinks} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Chips", name: "name" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Crunchy snack", name: "description" },
    });
    fireEvent.change(screen.getByLabelText(/recipe/i), {
      target: { value: "Fry it", name: "recipe" },
    });
    fireEvent.change(screen.getByLabelText(/serve/i), {
      target: { value: "In a bowl", name: "serve" },
    });

    fireEvent.click(screen.getByText(/add item/i));

    await waitFor(() => {
      expect(SnackOrBoozeApi.addItem).toHaveBeenCalled();
      expect(mockSetSnacks).toHaveBeenCalledWith(expect.any(Function));
      expect(history.location.pathname).toBe("/snacks");
    });
  });
});
