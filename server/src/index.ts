import {Elysia} from 'elysia'
import {itemRoutes} from './api/item'
import {categoryRoutes} from './api/category'

export const app = new Elysia({name: 'app', prefix: '/api'})
  .get('/health', () => {
    return 'Health'
  })
  .use(itemRoutes)
  .use(categoryRoutes)
  .listen(process.env.PORT ?? 8000)

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`)
