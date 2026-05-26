import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, beforeEach } from "vitest";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { setStoredSession } from "./lib/auth-storage";

describe("App routing", () => {
  beforeEach(() => {
    setStoredSession("test-token", {
      id: "admin-1",
      email: "admin@test.com",
      fullName: "Test Admin",
      createdAt: new Date().toISOString()
    });
  });

  it("renders HR dashboard home page when authenticated", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("HR Dashboard")).toBeTruthy();
    expect(screen.getByText("Employee Directory")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Browse employees" })).toBeTruthy();
  });

  it("redirects to login when not authenticated", () => {
    localStorage.clear();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeTruthy();
  });
});
