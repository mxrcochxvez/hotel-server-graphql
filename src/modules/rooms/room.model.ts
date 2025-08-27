import { eq } from "drizzle-orm";
import { db, DBType } from "../../repos/db/client.js"
import { roomsTable } from "../../db/index.js";

export enum RoomType {
	SINGLE = 'SINGLE',
	DOUBLE = 'DOUBLE',
	KING = 'KING',
}

interface Room {
	number: number
	type: RoomType
}

class RoomModel {
	#db: DBType

	constructor(database: DBType) {
		this.#db = database;
	}

	find(number: number) {
		return this.#db.query.roomsTable.findFirst({ 
			where: eq(roomsTable.number, number),
		 });
	}

	async create({ type, number }: Room): Promise<boolean> {
		try {
			await this.#db.insert(roomsTable).values({
				type,
				number,
			});

			return true;
		} catch(error: unknown) {
			console.error(error);

			return false;
		}
	}
}

export const roomModel = new RoomModel(db);
