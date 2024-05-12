import { PageProps } from "$fresh/server.ts";
import { User } from "../../types/user.ts";

interface LayoutData {
	user?: User;
}

export default function MainLayout({ Component }: PageProps) {

	return (
		<div class="flex flex-col h-[100vh]">
			<nav class="flex gap-x-4 p-4 bg-blue-200 border-b border-b-blue-400">
				<a href="/">Home</a>
				<a href="/login">Login</a>
				<a href="/register">Register</a>
			</nav>
			<main class="flex-1 p-4" role="main">
				<Component />
			</main>
			<footer class="text-center p-4 bg-blue-400 text-white">
				<p>&copy; 2021</p>
			</footer>
		</div>
	);
}