import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App routing", () => {
  it("renders HR dashboard home page", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("HR Dashboard")).toBeTruthy();
    expect(screen.getByText("Employee Directory")).toBeTruthy();
    expect(screen.getByRole("link", { name: "View employees" })).toBeTruthy();
  });
});
