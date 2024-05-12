import { Session } from "./session.ts";

/**
 * Validates if the auth session is inside surreal database.
 * @param session 
 */
export async function validateAuthSession(session: Session): Promise<boolean> {

	if(!session.tk) {
		return false;
	}

	return await session.db.authenticate(session.tk);
}