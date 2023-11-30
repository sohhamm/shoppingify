import Elysia from 'elysia'
import {db} from '../db'
import {insertItemSchema, item} from '../db/schema'
import {eq} from 'drizzle-orm'

export const itemRoutes = (app: Elysia) =>
  app.group('/items', app =>
    app
      .get('/', () => {
        return db.select().from(item)
      })
      .get('/:id', context => {
        return db.select().from(item).where(eq(item.item_id, context.params.id))
      })
      .post(
        '/',
        ({body}) => {
          const items = body
          return db.insert(item).values(items)
        },
        {
          body: insertItemSchema,
        },
      ),
  )
