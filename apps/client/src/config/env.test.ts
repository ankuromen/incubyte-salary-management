import { describe, expect, it } from "vitest";
import { env } from "./env";

describe("client env config", () => {
  it("exposes API base URL from Vite environment", () => {
    expect(env.apiBaseUrl).toBeTruthy();
    expect(env.apiBaseUrl.startsWith("/") || env.apiBaseUrl.startsWith("http")).toBe(true);
  });
});
