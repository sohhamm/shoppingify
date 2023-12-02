import * as schema from './schema'
import {drizzle} from 'drizzle-orm/libsql'
import {createClient} from '@libsql/client'

const client = createClient({url: Bun.env.TURSO_DB_URL, authToken: Bun.env.TURSO_DB_AUTH_TOKEN})

export const db = drizzle(client, {schema})
