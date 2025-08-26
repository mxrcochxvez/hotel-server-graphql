import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const roomsTable = sqliteTable("rooms", {
	number: int().primaryKey(),
	isMaster: int().default(0),
});
