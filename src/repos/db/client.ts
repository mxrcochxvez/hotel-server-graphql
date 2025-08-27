import 'dotenv/config';
import { createClient } from '@libsql/client/.';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../../db/index';

const client = createClient({ url: process.env.DB_FILE_NAME! });
export const db = drizzle(client, { schema });
