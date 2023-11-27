import Elysia from 'elysia'

export const categoryRoutes = (app: Elysia) =>
  app.group(
    '/category',
    app.get('/', () => {}).post('/', () => {}),
  )
