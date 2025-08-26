import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestsTable = sqliteTable("guests", {
	id: text().primaryKey(),
	name: text().notNull(),
	age: int().notNull(),
	email: text().notNull().unique(),
	checkinDate: text('checkin_date').notNull(),
	checkoutDate: text('checkout_date').notNull(),
});
