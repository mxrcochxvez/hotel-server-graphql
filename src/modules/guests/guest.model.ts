import { db, DBType } from "../../repos/db/client.ts";

interface Guest {
	id: string
	name: string
	checkoutDate: Date
	checkinDate: Date
}

class Guest {
	#db: DBType;

	constructor(database: DBType) {
		this.#db = database;
	}

	checkin(id: string) {
		
	}
}

export const guest = new Guest(db);
