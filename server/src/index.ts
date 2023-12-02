import {Elysia} from 'elysia'
import {cors} from '@elysiajs/cors'
import {itemRoutes} from './api/item'
import {categoryRoutes} from './api/category'

const app = new Elysia({prefix: '/api'})
  .get('/health', () => {
    return 'Health'
  })
  .use(cors())
  .use(itemRoutes)
  .use(categoryRoutes)
  .listen(process.env.PORT ?? 8000)

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`)

export type Server = typeof app
