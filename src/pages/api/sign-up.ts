// from https://lucia-auth.com/tutorials/username-and-password/astro

import { generateId, Scrypt } from "lucia";
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

	const userId = generateId(15);
	const hashedPassword = await new Scrypt().hash(password);

	// TODO: check if username is already used, see https://lucia-auth.com/guides/email-and-password/basics for generic approach
	await db.insert(usersTable).values({
		id: userId,
		email,
		hashed_password: hashedPassword
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/");
}
