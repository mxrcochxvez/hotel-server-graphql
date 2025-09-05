import { respond } from "../../utilities/graphql-response"
import { reservationModel } from "./reservation.model"

interface ReservationInput {
	roomNumber: number
	checkinDate: string
	checkoutDate: string
	guestId: string
	cardNumber?: string
}

export default {
	Query: {
		listReservations() {
			return listReservations();
		},

		listActiveReservations() {
			return listActiveReservations();
		},

		findReservation(_: never, reservationInput: ReservationInput) {
			return findReservation(reservationInput);
		}
	},

	Mutation: {
		createReservation(_: never, args: { input: ReservationInput }) {
			const { input } = args;

			return createReservation(input);
		}
	}
}

function listReservations() {
	return respond(() => reservationModel.list());
}

function listActiveReservations() {
	return respond(() => reservationModel.listActiveReservations());
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

function createReservation(createReservationInput: ReservationInput) {
	return respond(() => reservationModel.createReservation(createReservationInput));
}
