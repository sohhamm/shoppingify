import {drizzle} from 'drizzle-orm/libsql'
import {createClient} from '@libsql/client'

const client = createClient({url: Bun.env.DB_URL, authToken: Bun.env.DB_AUTH})

export const db = drizzle(client)
