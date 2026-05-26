import { describe, expect, it } from "vitest";
import { validateCreateEmployee } from "../employees/validation/employee.validation.js";
import {
  DEFAULT_SEED_COUNT,
  generateEmployeeRecords,
  loadNameLists
} from "./employee-generator.js";

describe("employee seed generation", () => {
  it("generates the requested number of records", () => {
    const records = generateEmployeeRecords(250);

    expect(records).toHaveLength(250);
  });

  it("uses first and last name lists to build full names", () => {
    const { firstNames, lastNames } = loadNameLists();
    const records = generateEmployeeRecords(100, { seed: 42 });

    for (const record of records) {
      const [firstName, lastName] = record.fullName.split(" ");
      expect(firstNames).toContain(firstName);
      expect(lastNames).toContain(lastName);
    }
  });

  it("generates valid employee data", () => {
    const records = generateEmployeeRecords(100, { seed: 99 });

    for (const record of records) {
      const validation = validateCreateEmployee(record);
      expect(validation.success).toBe(true);
    }
  });

  it("generates unique emails for each record", () => {
    const records = generateEmployeeRecords(1000, { seed: 7 });
    const emails = new Set(records.map((record) => record.email));

    expect(emails.size).toBe(1000);
  });

  it("defaults seed count to 10,000 employees", () => {
    expect(DEFAULT_SEED_COUNT).toBe(10_000);
  });
});
