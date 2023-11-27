import {Elysia} from 'elysia'
import {itemRoutes} from './api/item'

export const app = new Elysia({name: 'app', prefix: '/api'})
  .get('/health', () => {
    return 'Health'
  })
  .use(itemRoutes)
  .listen(process.env.PORT ?? 8000)

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`)
