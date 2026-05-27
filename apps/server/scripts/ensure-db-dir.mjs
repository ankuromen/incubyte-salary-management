import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl?.startsWith("file:")) {
  process.exit(0);
}

const filePath = databaseUrl.replace(/^file:/, "");
const absolutePath = filePath.startsWith("/") ? filePath : resolve(process.cwd(), filePath);
const directory = dirname(absolutePath);

mkdirSync(directory, { recursive: true });
console.log(`[start] database directory ready: ${directory}`);
