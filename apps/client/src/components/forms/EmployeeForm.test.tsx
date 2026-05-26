import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmployeeForm } from "./EmployeeForm";

const selectSearchableOption = async (
  user: ReturnType<typeof userEvent.setup>,
  comboboxName: RegExp | string,
  optionName: string
) => {
  await user.click(screen.getByRole("combobox", { name: comboboxName }));
  await user.click(screen.getByRole("option", { name: optionName }));
};

describe("EmployeeForm", () => {
  it("renders all required employee fields", () => {
    render(<EmployeeForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/full name/i)).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByRole("combobox", { name: /job title/i })).toBeTruthy();
    expect(screen.getByRole("combobox", { name: /country/i })).toBeTruthy();
    expect(screen.getByRole("combobox", { name: /department/i })).toBeTruthy();
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

  it("submits valid employee data from dropdowns", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<EmployeeForm onSubmit={onSubmit} />);
    const view = within(container);

    await user.type(view.getByLabelText("Full name"), "Jane Doe");
    await user.type(view.getByLabelText("Email"), "jane@example.com");
    await selectSearchableOption(user, /job title/i, "Software Engineer");
    await selectSearchableOption(user, /country/i, "India");
    await selectSearchableOption(user, /department/i, "Engineering");
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

  it("submits custom values when Other is selected", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<EmployeeForm onSubmit={onSubmit} />);
    const view = within(container);

    await user.type(view.getByLabelText("Full name"), "Jane Doe");
    await user.type(view.getByLabelText("Email"), "jane@example.com");

    await user.click(screen.getByRole("combobox", { name: /job title/i }));
    await user.click(screen.getByRole("option", { name: "Other (type manually)" }));
    await user.type(view.getByLabelText("Job title other"), "Principal Architect");

    await user.click(screen.getByRole("combobox", { name: /country/i }));
    await user.click(screen.getByRole("option", { name: "Other (type manually)" }));
    await user.type(view.getByLabelText("Country other"), "Brazil");

    await user.click(screen.getByRole("combobox", { name: /department/i }));
    await user.click(screen.getByRole("option", { name: "Other (type manually)" }));
    await user.type(view.getByLabelText("Department other"), "Legal");

    await user.clear(view.getByLabelText("Salary"));
    await user.type(view.getByLabelText("Salary"), "200000");
    await user.type(view.getByLabelText("Joining date"), "2024-06-01");
    await user.click(view.getByRole("button", { name: "Save Employee" }));

    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Jane Doe",
      email: "jane@example.com",
      jobTitle: "Principal Architect",
      country: "Brazil",
      department: "Legal",
      salary: 200000,
      dateOfJoining: "2024-06-01"
    });
  });
});
