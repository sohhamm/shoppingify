import Elysia from 'elysia'
import {db} from '../db'
import {insertItemSchema, item, itemCategory} from '../db/schema'
import {eq} from 'drizzle-orm'

export const itemRoutes = (app: Elysia) =>
  app.group('/items', app =>
    app
      .post(
        '/',
        async ({body}) => {
          const {category_id} = body
          const newBody = {
            ...body,
            category_id: undefined,
          }
          const items = await db.insert(item).values(newBody).returning()
          await db.insert(itemCategory).values({item_id: items[0].item_id, category_id})
          return items[0]
        },
        {
          body: insertItemSchema,
        },
      )
      .get('/', async () => {
        const res = await db.query.category.findMany({
          columns: {
            category_id: true,
            category_name: true,
          },
          with: {
            itemCategory: {
              columns: {},
              with: {
                item: true,
              },
            },
          },
        })

        return res
          .filter(cat => cat.itemCategory.length >= 1)
          .map(cat => ({
            category_id: cat.category_id,
            category_name: cat.category_name,
            items: cat.itemCategory.map(
              (i: {
                item: {
                  name: string
                  created_at: string | null
                  item_id: string
                  image: string | null
                  note: string | null
                }
              }) => ({item_id: i.item.item_id, name: i.item.name}),
            ),
          }))
      })
      .get('/:id', async context => {
        const res = await db.select().from(item).where(eq(item.item_id, context.params.id))
        return res.length ? res[0] : {msg: 'not found'}
      })
      .delete('/:id', context => {
        return db
          .delete(item)
          .where(eq(item.item_id, context.params.id))
          .returning({item_id: item.item_id})
      }),
  )
