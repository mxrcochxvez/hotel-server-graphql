import 'dotenv/config';
import { Client, createClient } from '@libsql/client/.';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../../db/index';

export type DBType = LibSQLDatabase<typeof schema> & {
	$client: Client
};

const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db: DBType = drizzle(client, { schema });
