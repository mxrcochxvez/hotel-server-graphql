import { eq } from "drizzle-orm";
import { db, DBType } from "../../repos/db/client.js"
import { roomsTable } from "../../db/index.js";

export enum RoomType {
	SINGLE = 'SINGLE',
	DOUBLE = 'DOUBLE',
	KING = 'KING',
}

export interface Room {
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

	create({ type, number }: Room) {
		return this.#db.insert(roomsTable).values({
			type,
			number,
		});
	}
}

export const roomModel = new RoomModel(db);
