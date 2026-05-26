import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Dashboard page", () => {
  it("renders initialized dashboard content", () => {
    render(<App />);

    expect(screen.getByText("Salary Management Dashboard")).toBeTruthy();
    expect(screen.getByText("System initialized successfully")).toBeTruthy();
    expect(screen.getByText(/API:/)).toBeTruthy();
  });
});
