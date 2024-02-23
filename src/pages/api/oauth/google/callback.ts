// from https://lucia-auth.com/tutorials/github-oauth/astro and https://arctic.js.org/guides/oauth2-pkce

import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";

import type { APIContext } from "astro";

import { google, lucia } from "@/auth";
import { db } from "db";
import { usersTable } from "db/schema";

export async function GET(context: APIContext): Promise<Response> {
	const code = context.url.searchParams.get("code");
	const state = context.url.searchParams.get("state");

	const storedState = context.cookies.get("google_oauth_state")?.value ?? null;
	const storedCodeVerifier = context.cookies.get("google_oauth_code_verifier")?.value ?? null;
	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const user = await googleUserResponse.json();

		// Replace this with your own DB client.
		const existingUser = await db.select().from(usersTable).where(eq(usersTable.google_id, user.sub))

		if (!!existingUser && existingUser.length > 0) {
			const session = await lucia.createSession(existingUser[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return context.redirect("/");
		}

		const userId = generateId(15);
		// TODO: check if username is already used, see https://lucia-auth.com/guides/email-and-password/basics for generic approach
		await db.insert(usersTable).values({
			id: userId,
			google_id: user.sub,
			email: user.email,
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return context.redirect("/");
	} catch (e) {
		// the specific error message depends on the provider
		console.error(e)
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}