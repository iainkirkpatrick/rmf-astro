// borrowed from https://lucia-auth.com/tutorials/username-and-password/astro

import { Lucia } from "lucia";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "../db";
import { sessionsTable, usersTable } from "../db/schema";

const adapter = new DrizzleMySQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email
		};
	}

});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
		};
	}
}