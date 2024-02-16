import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'mysql2',
	dbCredentials: {
		uri: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/rmf?ssl={"rejectUnauthorized":true}`
  }
} satisfies Config;