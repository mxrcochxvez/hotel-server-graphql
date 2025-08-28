import { reservationsTable } from "../../db/index.js";
import { DBType } from "../../repos/db/client";
import { BaseModel } from "../model/base.model";

type Reservation = {
	roomNumber: number,
	checkinDate: string,
	checkoutDate: string,
	guestId: string,
	cardNumber: string,
}

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
}
