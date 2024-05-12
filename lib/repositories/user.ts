import { RecordId } from "https://deno.land/x/surrealdb@v1.0.0-beta.6/mod.ts";
import { User, UserCreate, UserUpdate } from "../../types/user.ts";
import { Session, getSession, updateSession } from "../session.ts";

/**
 * Create a new user with the given details
 * @param details 
 * @returns created user
 */
export async function createUser(details: UserCreate): Promise<User> {

	const user = await db.create("user", {
		...details,
		created_at: new Date(),
		updated_at: new Date()
	}) as unknown as User;

	return user;
}

/**
 * Merges the details of a user with the given id
 * @param id 
 * @param details 
 * @returns updated user
 */
export async function updateUser(id: RecordId, details: Partial<UserUpdate>): Promise<Partial<User>> {
	return await db.merge(id, details);
}

/**
 * Deletes a user with the given id
 * @param id
 * @returns removed user
 */
export async function deleteUser(id: RecordId): Promise<Partial<User>> {
	return await db.delete(id);
}

/**
 * Login a user with the given email and password
 * @param email 
 * @param password 
 * @param session 
 * @returns 
 */
export async function loginUser(
	email: FormDataEntryValue | null,
	password: FormDataEntryValue | null,
	session: Session
): Promise<string> {

	const token = await session.db.signin({
		username: email,
		password,
		namespace: "blogger",
		database: "blogger",
		scope: "account"
	});

	return token;
}

export async function invalidateUserSession(sessionId: string) {
	const session = getSession(sessionId);

	if(!session) {
		throw new Error("Session not found");
	}

	await session.db.invalidate();
	updateSession(sessionId, { tk: undefined });
}