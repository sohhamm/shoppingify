import Elysia, {t} from 'elysia'
import {category, insertCategorySchema} from '../db/schema'
import {db} from '../db'
import {like} from 'drizzle-orm'

export const categoryRoutes = (app: Elysia) =>
  app.group('/categories', app =>
    app
      .post(
        '/',
        ({body}) => {
          return db.insert(category).values(body)
        },
        {body: t.Array(insertCategorySchema)},
      )
      .get(
        '/',
        async ctx => {
          const search = ctx.query.search ? `%${ctx.query.search}%` : ''
          if (search?.length) {
            return db.select().from(category).where(like(category.category_name, search))
          } else {
            return db.select().from(category)
          }
        },
        {query: t.Optional(t.Object({search: t.Optional(t.String())}))},
      ),
  )
