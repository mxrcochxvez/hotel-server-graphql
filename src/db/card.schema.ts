import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cardsTable = sqliteTable("cards", {
	id: text().primaryKey(),
	roomNumber: text('room_number'),
});
