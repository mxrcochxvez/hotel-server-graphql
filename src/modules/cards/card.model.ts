import { db } from '../../repos/db/client';

class CardModel {
	#db: any;

	constructor(drizzleClient: any) {
		this.#db = drizzleClient;
	}

	find(id: string) {
		return this.#db.query
	}
}

export const cardModel = new CardModel(db);
