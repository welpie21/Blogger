import { Modified } from "./modified.ts";
import { Record } from "./record.ts";

export interface User extends Record, Modified {
	fullname: string;
	email: string;
}

export interface UserCreate extends Exclude<User, "id"> {
	password: string;
}

export interface UserUpdate extends Partial<Exclude<User, "id">> {
	id: User["id"];
}

export interface UserLogin {
	email: User["email"];
	password: string;
}

export interface UserLoginResponse {
	token: string;
}