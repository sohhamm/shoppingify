import {integer, primaryKey, sqliteTable, text} from 'drizzle-orm/sqlite-core'
import {relations, sql} from 'drizzle-orm'
import {v4 as uuidv4} from 'uuid'
import {createInsertSchema, createSelectSchema} from 'drizzle-typebox'
import {t} from 'elysia'

export const item = sqliteTable('item', {
  item_id: text('item_id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text('name').notNull(),
  image: text('image'),
  note: text('note'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const selectItemSchema = createSelectSchema(item)
export const createItemSchema = createInsertSchema(item)
export const insertItemSchema = t.Intersect([createItemSchema, t.Object({category_id: t.String()})])

export const category = sqliteTable('category', {
  category_id: text('category_id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  category_name: text('category_name').notNull(),
  category_desc: text('category_desc'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const selectCategorySchema = createSelectSchema(category)
export const insertCategorySchema = createInsertSchema(category)

export const itemCategory = sqliteTable(
  'item_category',
  {
    item_id: text('item_id')
      .notNull()
      .references(() => item.item_id, {onDelete: 'cascade'}),
    category_id: text('category_id')
      .notNull()
      .references(() => category.category_id, {onDelete: 'cascade'}),
  },
  t => ({pk: primaryKey({columns: [t.item_id, t.category_id]})}),
)

export const cart = sqliteTable('cart', {
  cart_id: text('cart_id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text('name').default('Shopping List').notNull(),
  // enum: ongoing, completed, cancelled
  status: text('status', {enum: ['ongoing', 'completed', 'cancelled']})
    .default('ongoing')
    .notNull(),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP`),
})

export const selectCartSchema = createSelectSchema(cart)
export const createCartSchema = createInsertSchema(cart)

export const cartItem = sqliteTable(
  'cart_item',
  {
    cart_id: text('cart_id').references(() => cart.cart_id),
    item_id: text('item_id').references(() => item.item_id),
    quantity: integer('quantity').notNull(),
  },
  t => ({pk: primaryKey(t.cart_id, t.item_id)}),
)

// relations

export const itemRelations = relations(item, ({many, one}) => ({
  itemCategory: many(itemCategory),
  category: one(itemCategory, {
    fields: [item.item_id],
    references: [itemCategory.item_id],
  }),
  cartItem: many(cartItem),
}))

export const categoryRelations = relations(category, ({many}) => ({
  itemCategory: many(itemCategory),
}))

export const itemCategoryRelation = relations(itemCategory, ({one}) => ({
  item: one(item, {
    fields: [itemCategory.item_id],
    references: [item.item_id],
  }),
  category: one(category, {
    fields: [itemCategory.category_id],
    references: [category.category_id],
  }),
}))

export const cartRelations = relations(cart, ({many}) => ({
  cartItem: many(cartItem),
}))

export const cartItemRelations = relations(cartItem, ({one}) => ({
  item: one(item, {
    fields: [cartItem.item_id],
    references: [item.item_id],
  }),
  cart: one(cart, {
    fields: [cartItem.cart_id],
    references: [cart.cart_id],
  }),
}))
