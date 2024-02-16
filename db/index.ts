import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
// N.B. use process.env first and then import.meta.env to allow for seed script outside of Astro
export const connection = connect({
  host: process.env.DATABASE_HOST || import.meta.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME || import.meta.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD || import.meta.env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);