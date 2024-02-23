import type { APIContext } from "astro";

import { lucia } from "@/auth";

// TODO: should this be POST as per https://lucia-auth.com/tutorials/username-and-password/astro? does it matter? in general, sort out how this route is called in Layout.astro
export async function GET(context: APIContext): Promise<Response> {
	if (!context.locals.session) {
		return new Response(null, {
			status: 401
		});
	}

	await lucia.invalidateSession(context.locals.session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/");
}
