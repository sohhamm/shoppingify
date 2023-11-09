import {sql} from 'drizzle-orm'
import {text, integer, sqliteTable} from 'drizzle-orm/sqlite-core'
import {createInsertSchema, createSelectSchema} from 'drizzle-typebox'

export const item = sqliteTable('item', {
  id: integer('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull(),
  category: text('category').notNull().default('No Category'),
  image: text('image'),
  note: text('note'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const selectItemSchema = createSelectSchema(item)
export const insertItemSchema = createInsertSchema(item)
