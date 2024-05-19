import type { Config } from "drizzle-kit";

export default {
  schema: "./src/api/database/schema/index.ts",
  out: "./drizzle/migrations",
  verbose: true,
  strict: true,
} satisfies Config;
