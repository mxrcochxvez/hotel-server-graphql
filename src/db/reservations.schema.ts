import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reservationsTable = sqliteTable("reservations", {
	roomNumber: int('room_number').primaryKey(),
	checkinDate: text('checkin_date').notNull(),
	checkoutDate: text('checkout_date').notNull(),
	guestId: text('guest_id').notNull(),
	cardNumber: text('card_number').notNull(),
});
