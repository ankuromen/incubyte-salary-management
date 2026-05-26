import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password.js";

describe("password utils", () => {
  it("hashes and verifies a password", async () => {
    const hash = await hashPassword("Admin@123");
    expect(hash).not.toBe("Admin@123");
    await expect(verifyPassword("Admin@123", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong", hash)).resolves.toBe(false);
  });
});
