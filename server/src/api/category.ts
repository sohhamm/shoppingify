import Elysia, {t} from 'elysia'
import {category, insertCategorySchema, item, itemCategory} from '../db/schema'
import {db} from '../db'
import {eq} from 'drizzle-orm'

export const categoryRoutes = (app: Elysia) =>
  app.group('/category', app =>
    app
      .post(
        '/',
        ({body}) => {
          return db.insert(category).values(body)
        },
        {body: t.Array(insertCategorySchema)},
      )
      .get('/', () => {
        return db.select().from(category)
      }),
  )
