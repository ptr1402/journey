import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema/index.ts",
  out: "./drizzle/migrations",
  verbose: true,
  strict: true,
} satisfies Config;
