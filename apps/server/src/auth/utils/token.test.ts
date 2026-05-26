import { describe, expect, it } from "vitest";
import { signAccessToken, verifyAccessToken } from "./token.js";

describe("token utils", () => {
  it("signs and verifies an access token payload", () => {
    const token = signAccessToken({ adminId: "admin-1", email: "admin@example.com" });
    const payload = verifyAccessToken(token);

    expect(payload.adminId).toBe("admin-1");
    expect(payload.email).toBe("admin@example.com");
  });

  it("rejects invalid tokens", () => {
    expect(() => verifyAccessToken("not-a-token")).toThrow();
  });
});
