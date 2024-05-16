import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

dotenv.config();

const connectionString: string | undefined = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not defined.");
}

const sql = postgres(connectionString, { prepare: false });
const db = drizzle(sql);

async function runMigrations() {
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  await sql.end();
}

runMigrations();
