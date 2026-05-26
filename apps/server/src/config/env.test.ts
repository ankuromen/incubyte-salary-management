import { afterEach, describe, expect, it, vi } from "vitest";

describe("env config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("parses valid environment variables", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("PORT", "4000");
    vi.stubEnv("DATABASE_URL", "file:./test.db");

    const { env } = await import("./env.js");

    expect(env.NODE_ENV).toBe("test");
    expect(env.PORT).toBe(4000);
    expect(env.DATABASE_URL).toBe("file:./test.db");
  });

  it("applies defaults when optional values are missing", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const { env } = await import("./env.js");

    expect(env.PORT).toBe(3000);
    expect(env.DATABASE_URL).toBe("file:./dev.db");
  });
});
