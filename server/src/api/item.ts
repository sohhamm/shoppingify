import Elysia from 'elysia'
import {db} from '../db'
import {insertItemSchema, item} from '../db/schema/item'

export const itemRoutes = (app: Elysia) =>
  app.group('/items', app =>
    app
      .get('/', () => {})
      .get('/:id', context => {
        return `item info ${context.params.id}`
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
