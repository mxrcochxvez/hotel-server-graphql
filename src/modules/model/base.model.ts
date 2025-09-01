import type { AnySQLiteTable } from "drizzle-orm/sqlite-core";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { DBType } from "../../repos/db/client.js";

type QueryMap = DBType["query"];
type FindFirstOpts<Q> = Q extends { findFirst: (o?: infer O) => any } ? O : never;
type FindManyOpts<Q>	= Q extends { findMany:	(o?: infer O) => any } ? O : never;

export class BaseModel<TKey extends keyof QueryMap, TTable extends AnySQLiteTable> {
	#db: DBType;
	#key: TKey;
	#table: TTable;

	constructor(database: DBType, key: TKey, table: TTable) {
		this.#db = database;
		this.#key = key;
		this.#table = table;
	}

	read(options?: FindFirstOpts<QueryMap[TKey]>) {
		return this.#db.query[this.#key].findFirst(options);
	}

	list(options?: FindManyOpts<QueryMap[TKey]>) {
		return this.#db.query[this.#key].findMany(options);
	}

	create(data: InferInsertModel<TTable>) {
		return this.#db.insert(this.#table).values(data).returning() as Promise<InferSelectModel<TTable>[]>;
	}
}
