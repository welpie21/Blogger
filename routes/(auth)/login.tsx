import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import { Input } from "../../components/input.tsx";
import { loginUser } from "../../lib/repositories/user.ts";
import { getSession } from "../../lib/session.ts";

export const handler: Handlers = {
	async GET(req, ctx) {
		return ctx.render();
	},
	async POST(req, ctx) {
		const form = await req.formData();

		const email = form.get("email");
		const password = form.get("password");

		const session = getSession(req);

		if(!session) {
			return new Response("Session not found", { status: 401 });
		}

		const token = await loginUser(email, password, ctx.session);

		if(!token) {
			return new Response("Invalid credentials", { status: 401 });
		}

		return new Response("Logged in", { status: 200 });
	}
};

export default function LoginPage(props: PageProps) {

	return (
		<div>
			<form
				class="flex flex-col w-1/4 mx-auto mt-20 gap-y-3" 
				method="post"
			>
				<Input type="email" name="email" placeholder="Email" />
				<Input type="password" name="password" placeholder="Password" />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}