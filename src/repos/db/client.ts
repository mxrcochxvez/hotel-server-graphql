import 'dotenv/config';
import { Client } from '@libsql/client';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../../db/index.js';

export type DBType = LibSQLDatabase<typeof schema> & {
	$client: Client
};

export const db = drizzle({
	connection: {
		url: process.env.DB_FILE_NAME,
	},
	schema
});
