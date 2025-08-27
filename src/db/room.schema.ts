import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const roomsTable = sqliteTable("rooms", {
	number: int().primaryKey(),
	type: text().notNull(),
});
