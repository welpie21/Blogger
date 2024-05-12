import { FreshContext } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std/http/cookie.ts";
import { getCookies } from "$std/http/cookie.ts";
import { createSession } from "../../lib/session.ts";

export async function handler(req: Request, ctx: FreshContext) {

	const response = await ctx.next();

	const url = new URL(req.url);
	const cookies = getCookies(req.headers);

	if (!cookies.sessionId) {
		const session = await createSession();

		setCookie(response.headers, {
			name: "sessionId",
			value: session.id,
			httpOnly: true,
			maxAge: 3600,
			domain: url.hostname,
			secure: false,
			sameSite: "Lax"
		});
	}

	return response;
}