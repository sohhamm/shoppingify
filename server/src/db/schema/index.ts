import {sqliteTable, text} from 'drizzle-orm/sqlite-core'
import {sql} from 'drizzle-orm'
import {v4 as uuidv4} from 'uuid'
import {createInsertSchema, createSelectSchema} from 'drizzle-typebox'

export const item = sqliteTable('item', {
  item_id: text('item_id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text('name').notNull(),
  image: text('image'),
  note: text('note'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const selectItemSchema = createSelectSchema(item)
export const insertItemSchema = createInsertSchema(item)

export const category = sqliteTable('category', {
  category_id: text('category_id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  category_name: text('category_name').notNull(),
  category_desc: text('category_desc'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const selectCategorySchema = createSelectSchema(category)
export const insertCategorySchema = createInsertSchema(category)

export const itemCategory = sqliteTable('item_category', {
  item_id: text('item_id')
    .notNull()
    .references(() => item.item_id),
  category_id: text('category_id')
    .notNull()
    .references(() => category.category_id),
})
