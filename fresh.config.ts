import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

const tailwindPlugin = tailwind({
	autoprefixer: {
		add: true
	}
});

export default defineConfig({
	plugins: [tailwindPlugin],
	server: {
		port: 3000
	}
});
