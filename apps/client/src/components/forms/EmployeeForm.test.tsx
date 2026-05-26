import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmployeeForm } from "./EmployeeForm";

describe("EmployeeForm", () => {
  it("renders all required employee fields", () => {
    render(<EmployeeForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/full name/i)).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/job title/i)).toBeTruthy();
    expect(screen.getByLabelText(/country/i)).toBeTruthy();
    expect(screen.getByLabelText(/department/i)).toBeTruthy();
    expect(screen.getByLabelText(/salary/i)).toBeTruthy();
    expect(screen.getByLabelText(/joining date/i)).toBeTruthy();
  });

  it("shows validation errors for invalid input", async () => {
    const user = userEvent.setup();
    const { container } = render(<EmployeeForm onSubmit={vi.fn()} />);
    const view = within(container);

    await user.click(view.getByRole("button", { name: "Save Employee" }));

    expect(view.getByText("Full name is required")).toBeTruthy();
    expect(view.getByText("Enter a valid email")).toBeTruthy();
  });

  it("submits valid employee data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<EmployeeForm onSubmit={onSubmit} />);
    const view = within(container);

    await user.type(view.getByLabelText("Full name"), "Jane Doe");
    await user.type(view.getByLabelText("Email"), "jane@example.com");
    await user.type(view.getByLabelText("Job title"), "Software Engineer");
    await user.type(view.getByLabelText("Country"), "India");
    await user.type(view.getByLabelText("Department"), "Engineering");
    await user.clear(view.getByLabelText("Salary"));
    await user.type(view.getByLabelText("Salary"), "120000");
    await user.type(view.getByLabelText("Joining date"), "2024-01-15");
    await user.click(view.getByRole("button", { name: "Save Employee" }));

    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Jane Doe",
      email: "jane@example.com",
      jobTitle: "Software Engineer",
      country: "India",
      department: "Engineering",
      salary: 120000,
      dateOfJoining: "2024-01-15"
    });
  });
});
