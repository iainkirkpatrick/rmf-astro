/// <reference types="astro/client" />

// Lucia, from https://lucia-auth.com/getting-started/astro
declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
}
