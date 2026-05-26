import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(currentDir, "../..");

if (process.env.VITEST !== "true") {
  config({ path: path.join(serverRoot, ".env") });
}
