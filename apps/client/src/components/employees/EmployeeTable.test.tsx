import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Employee } from "../../types/employee";
import { EmployeeTable } from "./EmployeeTable";

const employees: Employee[] = [
  {
    id: "emp-1",
    fullName: "Jane Doe",
    email: "jane@example.com",
    jobTitle: "Software Engineer",
    country: "India",
    department: "Engineering",
    salary: 120000,
    dateOfJoining: "2024-01-15T00:00:00.000Z",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z"
  }
];

describe("EmployeeTable", () => {
  it("renders employees with search, filters, and actions", () => {
    render(
      <EmployeeTable
        employees={employees}
        pagination={{ page: 1, limit: 10, total: 1, totalPages: 1 }}
        filters={{ search: "", country: "", department: "" }}
        countryOptions={["India"]}
        departmentOptions={["Engineering"]}
        onSearchChange={vi.fn()}
        onCountryChange={vi.fn()}
        onDepartmentChange={vi.fn()}
        onPageChange={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Search employees")).toBeTruthy();
    expect(screen.getByLabelText(/country filter/i)).toBeTruthy();
    expect(screen.getByLabelText(/department filter/i)).toBeTruthy();
    expect(screen.getByText("Jane Doe")).toBeTruthy();
    expect(screen.getByRole("button", { name: /edit jane doe/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /delete jane doe/i })).toBeTruthy();
  });

  it("calls filter and pagination handlers", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    const onCountryChange = vi.fn();
    const onPageChange = vi.fn();

    const { container } = render(
      <EmployeeTable
        employees={employees}
        pagination={{ page: 1, limit: 10, total: 20, totalPages: 2 }}
        filters={{ search: "", country: "", department: "" }}
        countryOptions={["India", "USA"]}
        departmentOptions={["Engineering"]}
        onSearchChange={onSearchChange}
        onCountryChange={onCountryChange}
        onDepartmentChange={vi.fn()}
        onPageChange={onPageChange}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    const view = within(container);

    await user.type(view.getByLabelText("Search employees"), "jane");
    await user.selectOptions(view.getByLabelText("Country filter"), "India");
    await user.click(view.getByRole("button", { name: "Next page" }));

    expect(onSearchChange).toHaveBeenCalled();
    expect(onCountryChange).toHaveBeenCalledWith("India");
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
