import { DBType } from "../../repos/db/client";

type QueryMap = DBType["query"];
type FindFirstOpts<Q> =
	Q extends { findFirst: (opts?: infer O) => any } ? O : never;

export class BaseModel<TTable extends keyof QueryMap> {
	#db: DBType;
	#table: TTable;

	constructor(database: DBType, table: TTable) {
		this.#db = database;
		this.#table = table;
	}

	read(options?: FindFirstOpts<QueryMap[TTable]>) {
		return this.#db.query[this.#table].findFirst(options);
	}

	list(options?: FindFirstOpts<QueryMap[TTable]>) {
	return this.#db.query[this.#table].findMany(options);
	}
}
