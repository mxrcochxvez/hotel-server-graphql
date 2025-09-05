import { and, eq, lte, gt, SQL } from "drizzle-orm";
import { reservationsTable } from "../../db/index.js";
import { db, DBType } from "../../repos/db/client.js";
import { BaseModel } from "../model/base.model.js";

type Reservation = {
	roomNumber: number;
	checkinDate: string;
	checkoutDate: string;
	guestId: string;
	cardNumber?: string;
};

type SearchableReservationData = Partial<Reservation>;

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

class ReservationModel extends BaseModel<"reservationsTable", typeof reservationsTable> {
	constructor(database: DBType) {
		super(database, "reservationsTable", reservationsTable);
	}

	createReservation(reservation: Reservation) {
		return this.create(reservation);
	}

	async findActiveReservation({
		roomNumber,
		checkinDate,
		checkoutDate,
		guestId,
		cardNumber,
	}: SearchableReservationData) {
		const clauses: SQL[] = [];

		if (roomNumber !== undefined) {
			clauses.push(eq(reservationsTable.roomNumber, roomNumber));
		}
		if (guestId !== undefined) {
			clauses.push(eq(reservationsTable.guestId, guestId));
		}
		if (cardNumber !== undefined) {
			clauses.push(eq(reservationsTable.cardNumber, cardNumber));
		}
		if (checkinDate !== undefined) {
			const checkin = isoDate(new Date(checkinDate));
			clauses.push(eq(reservationsTable.checkinDate, checkin));
		}
		if (checkoutDate !== undefined) {
			const checkout = isoDate(new Date(checkoutDate));
			clauses.push(eq(reservationsTable.checkoutDate, checkout));
		}

		const results = await this.listActiveReservations(clauses, 1);
		
		return results[0] || null;
	}

	listActiveReservations(extraClauses: SQL[] = [], limit?: number) {
		const nowIso = isoDate(new Date());

		return this.list({
			where: and(
				...extraClauses,
				lte(reservationsTable.checkinDate, nowIso),
				gt(reservationsTable.checkoutDate, nowIso)
			),
			limit,
		});
	}
}

export const reservationModel = new ReservationModel(db);
