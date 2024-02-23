// borrowed from https://lucia-auth.com/tutorials/username-and-password/astro

import { Lucia } from "lucia";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { generateState, Google } from "arctic";

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
			email: attributes.email,
			// username: attributes.username
		};
	}

});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			// username: string;
		};
	}
}

export const google = new Google(
	import.meta.env.GOOGLE_CLIENT_ID,
	import.meta.env.GOOGLE_CLIENT_SECRET,
	import.meta.env.GOOGLE_OAUTH_REDIRECT_URI,
);