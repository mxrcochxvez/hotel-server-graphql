import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const cardsTable = sqliteTable("cards", {
	id: text().primaryKey(),
	roomNumber: int('room_number'),
});
