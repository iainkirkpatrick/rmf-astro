// from https://lucia-auth.com/tutorials/email-and-password/astro

import { Scrypt } from "lucia";
import { eq } from "drizzle-orm";
import type { APIContext } from "astro";

import { lucia } from "@/auth";

import { db } from "db";
import { usersTable } from "db/schema";

import { isValidEmail } from "@/utils/isValidEmail";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();

	const email = formData.get("email");
	if (!email || typeof email !== "string" || !isValidEmail(email)) {
		return new Response("Invalid email", {
			status: 400
		});
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return new Response("Invalid password", {
			status: 400
		});
	}

	const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()))
	if (!existingUser || existingUser.length === 0) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid emails from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid emails.
		// However, valid emails can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is none-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If emails are public, you may outright tell the user that the email is invalid.
		return new Response("Incorrect email or password", {
			status: 400
		});
	}

	// @ts-ignore: TODO fix hashed_password being maybe null
	const validPassword = await new Scrypt().verify(existingUser[0].hashed_password, password);
	if (!validPassword) {
		return new Response("Incorrect email or password", {
			status: 400
		});
	}

	const session = await lucia.createSession(existingUser[0].id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/");
}
