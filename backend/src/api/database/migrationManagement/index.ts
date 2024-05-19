import { migrate } from "drizzle-orm/postgres-js/migrator";
import { sql, db } from "../config/databaseConfig";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  await sql.end();
}

runMigrations();
