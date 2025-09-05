import { eq, isNull, SQL } from 'drizzle-orm';
import { db, DBType } from '../../repos/db/client.js';
import { cardsTable } from '../../db/index.js';

class CardModel {
	#db: DBType;

	constructor(drizzleClient: DBType) {
		this.#db = drizzleClient;
	}

	find(id: string) {
		return this.#db.query.cardsTable.findFirst({
			where: eq(cardsTable.id, id),
		});
	}

	bulkCreate(amount: number, startingPoint: number = 1) {
		const iterateOver = Array.from({ length: amount });

		const createPromises = iterateOver.map((_, index) => {
			const cardNumber = index + startingPoint;

			return this.#db.insert(cardsTable).values({ id: `${cardNumber}` });
		});

		return Promise.all(createPromises);
	}

	listCards(where?: SQL<unknown>) {
		return this.#db.query.cardsTable.findMany({
			where,
		});
	}

	listAvailableCards() {
		return this.listCards(isNull(cardsTable.roomNumber));
	}
}

export const cardModel = new CardModel(db);
