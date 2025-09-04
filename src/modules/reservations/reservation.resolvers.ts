import { create } from "domain"
import { respond } from "../../utilities/graphql-response"
import { reservationModel } from "./reservation.model"

interface ReservationInput {
	roomNumber: number
	checkinDate: string
	checkoutDate: string
	guestId: string
	cardNumber: string
}

interface CreateReservationInput {
	roomNumber: number
	checkinDate: string
	checkoutDate: string
	guestId: string
	cardNumber?: string
}

export default {
	Query: {
		findReservation(_: never, reservationInput: ReservationInput) {
			return findReservation(reservationInput);
		}
	},

	Mutation: {
		createReservation(_: never, createReservationInput: CreateReservationInput) {

		}
	}
}

function findReservation(reservationInput: ReservationInput) {
	return respond(async () => {
		try {
			const result = await reservationModel.findActiveReservation(reservationInput);

			if (result) {
				return result;
			}

			throw new Error();
		} catch {
			throw new Error('Could not find the record with the given data');
		}
	});
}

function createReservation(createReservationInput: CreateReservationInput) {
	return respond(() => reservationModel.createReservation(createReservationInput));
}
