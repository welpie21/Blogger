// We are going to extend the FreshContext interface to include a new property.

import { Session } from "../lib/session.ts";

declare module "$fresh/server.ts" {
	interface FreshContext {
		session: Session;
	}
};