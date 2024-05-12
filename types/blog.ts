import { Modified } from "./modified.ts";
import { Record } from "./record.ts";

export interface Blog extends Modified, Record {
	title: string;
	content: string;
}