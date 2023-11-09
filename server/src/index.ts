import {Elysia} from 'elysia'
import {itemRoutes} from './api/item'

export const app = new Elysia({name: 'app'}).use(itemRoutes).listen(process.env.PORT ?? 8080)

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`)
