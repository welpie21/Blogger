import { Surreal } from "https://deno.land/x/surrealdb@v1.0.0-beta.6/mod.ts";
import { validate } from "$std/uuid/mod.ts";
import { validateAuthSession } from "./auth.ts";
import { getCookies } from "$std/http/cookie.ts";

export interface Session {
	id: string;
	db: Surreal;
	tk?: string;
}

/**
 * Here we want to store the sessions in a Map object.
 * The key will be the session ID and the value will be the session object.
 * [sessionID, session]
 */
export const sessions = new Map<string, Session>([]);

/**
 * This function will create a new session object and store it in the sessions Map.
 * @param db The Surreal database object
 * @returns The session object
 */
export async function createSession(): Promise<Session> {
	const uuid = crypto.randomUUID();

	if (!validate(uuid)) {
		throw new Error("Invalid UUID");
	}

	const db = new Surreal();

	await db.connect("ws://localhost:8000/rpc", {
		namespace: "blogger",
		database: "blogger"
	});

	return sessions.set(uuid, {
		db,
		id: uuid,
		tk: undefined
	}).get(uuid)!;
}

/**
 * This function will return the session object from the sessions Map.
 * @param sessionId 
 * @param session
 */
export function updateSession(sessionId: string, session: Partial<Session>): Session {
	const _session = sessions.get(session.tk!);

	if (!_session) {
		throw new Error("Session not found");
	}

	const newSession = Object.assign(_session, session);
	sessions.set(sessionId, newSession);

	return newSession;
}

/**
 * This function will return the session object from the sessions Map.
 * @param session 
 */
export function getSession(session: string | Request): Session | undefined {

	if (typeof session === "string") {
		return sessions.get(session);
	}

	const cookies = getCookies(session.headers);

	if (!cookies.sessionId) {
		return undefined;
	}

	return sessions.get(cookies.sessionId);
}

/**
 * This function will remove the session object from the sessions Map.
 * @param sessionId 
 */
export function deleteSession(sessionId: string): void {
	sessions.delete(sessionId);
}

/**
 * Validate the session token by authenticating with the Surreal database.
 * @param sessionId 
 * @returns 
 */
export async function validateSession(sessionId: string): Promise<boolean> {
	const session = getSession(sessionId);

	if (!session) {
		return false;
	}

	return await validateAuthSession(session);
}