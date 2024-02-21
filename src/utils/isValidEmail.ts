// from https://lucia-auth.com/guides/email-and-password/basics

export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}