import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

dotenv.config();

const connectionString: string | undefined = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not defined.");
}

export const sql = postgres(connectionString, { prepare: false });
export const db = drizzle(sql);
