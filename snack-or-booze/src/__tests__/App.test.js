import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import SnackOrBoozeApi from "../Api";

jest.mock("../Api");

describe("App integration test", () => {
  beforeEach(() => {
    SnackOrBoozeApi.getSnacks.mockResolvedValue([]);
    SnackOrBoozeApi.getDrinks.mockResolvedValue([]);
  });

  it("renders loading message and then homepage", async () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/welcome to silicon valley/i)).toBeInTheDocument();
    });
  });
});
