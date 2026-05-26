import { describe, expect, it } from "vitest";
import { validateCreateEmployee } from "./employee.validation.js";

const validEmployeeInput = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  jobTitle: "Software Engineer",
  country: "India",
  department: "Engineering",
  salary: 120000,
  dateOfJoining: "2024-01-15"
};

describe("create employee validation", () => {
  it("accepts valid employee input", () => {
    const result = validateCreateEmployee(validEmployeeInput);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("jane.doe@example.com");
      expect(result.data.salary).toBe(120000);
    }
  });

  it("rejects invalid email", () => {
    const result = validateCreateEmployee({
      ...validEmployeeInput,
      email: "not-an-email"
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("email"))).toBe(true);
    }
  });

  it("rejects invalid salary", () => {
    const result = validateCreateEmployee({
      ...validEmployeeInput,
      salary: -1
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("salary"))).toBe(true);
    }
  });

  it("rejects missing required fields", () => {
    const result = validateCreateEmployee({
      email: "jane.doe@example.com",
      salary: 120000
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toContain("fullName");
      expect(paths).toContain("country");
      expect(paths).toContain("jobTitle");
      expect(paths).toContain("department");
    }
  });
});
