import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {

	const origin = req.headers.get("Origin") || "";
	const response = await ctx.next();
	
	response.headers.set("Access-Control-Allow-Origin", origin);
	response.headers.set("Access-Control-Allow-Credentials", "true");
	response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
	response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

	return response;
}