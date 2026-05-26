import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(currentDir, "../../../..");

// Skip loading .env during Vitest so tests control process.env directly.
if (process.env.VITEST !== "true") {
  config({ path: path.join(monorepoRoot, ".env") });
}
