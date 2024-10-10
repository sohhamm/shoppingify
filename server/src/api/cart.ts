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

          let cartRes

          if (body.quantity === 0) {
            cartRes = await db.query.cartItem.findMany({where: eq(cartItem.cart_id, params.id)})
          }

          let res1

          if (!res) {
            res1 = await db
              .insert(cartItem)
              .values({
                cart_id: params.id,
                item_id: body.item_id,
                quantity: body.quantity,
              })
              .returning()
          } else {
            if (body.quantity === 0) {
              res1 = await db
                .delete(cartItem)
                .where(and(eq(cartItem.cart_id, params.id), eq(cartItem.item_id, body.item_id)))
                .returning()

              if (cartRes?.length === 1) {
                // delete the cart, since it's the last item in the cart
                res1 = await db.delete(cart).where(eq(cart.cart_id, params.id)).returning()
              }
            } else {
              res1 = await db
                .update(cartItem)
                .set({quantity: body.quantity})
                .where(and(eq(cartItem.cart_id, params.id), eq(cartItem.item_id, body.item_id)))
                .returning()
            }
          }

          if (res1.length > 0) {
            return {cart_id: res1[0].cart_id, item_id: res1[0].item_id, success: true}
          } else {
            return {success: false}
          }
        },
        {
          body: t.Object({
            name: t.Optional(t.String()),
            item_id: t.String(),
            quantity: t.Number({minimum: 0}),
          }),
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

        if (res?.cart?.cart_id) {
          let _items: {category_id?: string; items: any[]; category_name?: string}[] = []

          res.cart.cartItem.forEach(ci => {
            const idx = _items?.findIndex(
              i => i?.category_id === ci.item?.category.category.category_id,
            )
            if (idx !== -1) {
              _items[idx].items = [
                ..._items[idx].items,
                {item_id: ci.item?.item_id, name: ci.item?.name, quantity: ci.quantity},
              ]
            } else {
              const obj = {
                category_name: ci.item?.category.category.category_name,
                category_id: ci.item?.category.category.category_id,
                items: [{item_id: ci.item?.item_id, name: ci.item?.name, quantity: ci.quantity}],
              }
              _items.push(obj)
            }
          })

          return {
            name: res.cart.name,
            cart_id: res.cart.cart_id,
            items: _items,
          }
        } else {
          return {msg: 'No cart found', data: []}
        }
      })
      .get('/', () => {
        return db.query.cartItem.findMany()
      })
      .patch(
        '/:id/status',
        async ({body, params}) => {
          const res = await db
            .update(cart)
            .set({status: body.status})
            .where(eq(cart.cart_id, params.id))
          return res
        },
        {
          body: t.Object({status: t.Enum(Status)}),
        },
      ),
  )

enum Status {
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
