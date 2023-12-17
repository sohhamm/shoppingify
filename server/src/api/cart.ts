import Elysia, {t} from 'elysia'
import {db} from '../db'
import {cart, cartItem} from '../db/schema'
import {and, eq} from 'drizzle-orm'

export const cartRoutes = (app: Elysia) =>
  app.group('/carts', app =>
    app
      .post(
        '/',
        async ({body}) => {
          const res = await db.insert(cart).values({name: body.name}).returning()
          const res1 = await db
            .insert(cartItem)
            .values({cart_id: res[0].cart_id, item_id: body.item_id, quantity: body.quantity})
            .returning()

          return {cart_id: res1[0].cart_id, item_id: res1[0].item_id, success: true}
        },
        {
          body: t.Object({name: t.Optional(t.String()), item_id: t.String(), quantity: t.Number()}),
        },
      )
      .patch(
        '/:id',
        async ({body, params}) => {
          if (body.name) {
            await db.update(cart).set({name: body.name}).where(eq(cart.cart_id, params.id))
          }

          const res = await db.query.cartItem.findFirst({where: eq(cartItem.item_id, body.item_id)})

          console.log(res)

          let res1

          if (!res) {
            // todo add item to cart
            res1 = await db
              .insert(cartItem)
              .values({
                cart_id: params.id,
                item_id: body.item_id,
                quantity: body.quantity,
              })
              .returning()
          } else {
            // todo update quantity

            res1 = await db
              .update(cartItem)
              .set({quantity: body.quantity})
              .where(and(eq(cartItem.cart_id, params.id), eq(cartItem.item_id, body.item_id)))
              .returning()
          }
          console.log(res1, 'res1')

          if (res1.length > 0) {
            return {cart_id: res1[0].cart_id, item_id: res1[0].item_id, success: true}
          } else {
            return {success: false}
          }
        },
        {
          body: t.Object({name: t.Optional(t.String()), item_id: t.String(), quantity: t.Number()}),
        },
      )
      .get('/:id', async ({params}) => {
        const res = await db.query.cartItem.findFirst({
          where: eq(cartItem.cart_id, params.id),
          columns: {},
          with: {
            cart: {
              columns: {
                cart_id: true,
                name: true,
              },
              with: {
                cartItem: {
                  columns: {
                    quantity: true,
                  },
                  with: {
                    item: {
                      columns: {
                        name: true,
                        item_id: true,
                      },
                      with: {
                        category: {
                          columns: {},
                          with: {
                            category: {
                              columns: {
                                category_id: true,
                                category_name: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        return res?.cart
      })
      .get('/', () => {
        return db.query.cartItem.findMany()
      }),
  )
