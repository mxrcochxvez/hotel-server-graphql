import { eq } from 'drizzle-orm';
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
}

export const cardModel = new CardModel(db);
