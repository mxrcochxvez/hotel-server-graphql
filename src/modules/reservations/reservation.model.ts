import { and, eq, lte, gt } from "drizzle-orm";
import { reservationsTable } from "../../db/index.js";
import { db, DBType } from "../../repos/db/client.js";
import { AtLeastOne } from "../../utilities/atleast-one.js";
import { BaseModel } from "../model/base.model.js";

type Reservation = {
	roomNumber: number,
	checkinDate: string,
	checkoutDate: string,
	guestId: string,
	cardNumber: string,
}

type SearchableReservationData = AtLeastOne<Reservation>;

type ReservationInput =
	Omit<Reservation, 'checkinDate' | 'checkoutDate'> & {
		checkinDate: Date;
		checkoutDate: Date;
	};

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

class ReservationModel extends BaseModel<'reservationsTable', typeof reservationsTable> {
	constructor(database: DBType) {
		super(database, 'reservationsTable', reservationsTable);
	}

	createReservation(reservation: ReservationInput) {
		return this.create({
			...reservation,
			checkinDate: isoDate(reservation.checkinDate),
			checkoutDate: isoDate(reservation.checkoutDate),
		});
	}

	isReservationActive({
		roomNumber,
		checkinDate,
		checkoutDate,
		guestId,
		cardNumber,
	}: SearchableReservationData) {
		const nowIso = new Date().toISOString();

		const clauses: any[] = [];

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
			const checkin = new Date(checkinDate).toISOString();

			clauses.push(eq(reservationsTable.checkinDate, checkin));
		}
		if (checkoutDate !== undefined) {
			const checkout = new Date(checkoutDate).toISOString();

			clauses.push(eq(reservationsTable.checkoutDate, checkout));
		}

		clauses.push(lte(reservationsTable.checkinDate, nowIso));
		clauses.push(gt(reservationsTable.checkoutDate, nowIso));

		return this.read({ where: and(...clauses) });
	}

}

const reservationModel = new ReservationModel(db);
