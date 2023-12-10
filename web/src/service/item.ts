import {createMutation, createQuery} from '@tanstack/solid-query'
import {app} from './client'
import {queryClient} from '../App'

export const createItemsQuery = () => {
  return createQuery(() => ({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await app.items[''].get()
      if (res.error) throw res.error
      return res.data
    },
  }))
}

export const createItemQuery = (id: () => string) => {
  return createQuery(() => ({
    queryKey: ['items', id()],
    queryFn: async () => {
      const res = await app.items[id()].get()
      if (res.error) throw res.error
      return res.data
    },
  }))
}

export const createItemMutation = () => {
  return createMutation(() => ({
    mutationFn: async (item: {
      name: string
      category_id: string
      note: string | null
      image: string | null
    }) => {
      const res = await app.items[''].post(item)
      if (res.error) throw res.error
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['items']})
    },
  }))
}

export const list = [
  {
    category: 'Fruit and vegetables',
    category_id: '2701338f-e085-4de2-94aa-97ff1af00f39',
    items: [
      {
        id: '1',
        name: 'Tasty Concrete',
        quantity: 3,
      },
      {
        id: '2',
        name: 'Incredible Rubber Pants',
        quantity: 1,
      },
      {
        id: '3',
        name: 'Awesome Frozen Shirt',
        quantity: 2,
      },
    ],
  },
  {
    category: 'Meat and Fish',
    category_id: '817a16a5-9617-4bbf-bad8-6a113011c549',
    items: [
      {
        id: '9',
        name: 'Recycled Metal Tuna',
        quantity: 1,
      },
    ],
  },
  {
    category: 'Beverages',
    category_id: '3715a5ad-3b18-4537-a226-a1fb11e84190',
    items: [
      {
        id: '13',
        name: 'Refined Rubber Hat',
        quantity: 1,
      },
    ],
  },
  {
    category: 'Others',
    category_id: '8b4d4012-33fb-48e4-a3d2-db2825b92fb4',
    items: [
      {
        id: '19',
        name: 'Licensed Fresh Bike',
        quantity: 2,
      },
      {
        id: '20',
        name: 'Fantastic Fresh Ball',
        quantity: 2,
      },
      {
        id: '21',
        name: 'Licensed Steel Soap',
        quantity: 1,
      },
    ],
  },
]

// export const list: {
//   category: string
//   category_id: string
//   items: {
//     id: string
//     name: string
//     quantity: number
//   }[]
// }[] = []

export const shoppingHistory = [
  {
    month: 'August 2020',
    list: [
      {
        shopping_id: '1',
        shopping_name: 'Grocery List',
        updated_at: 'TZ',
        status: 'completed',
      },
      {
        shopping_id: '2',
        shopping_name: 'Grocery List',
        updated_at: 'TZ',
        status: 'cancelled',
      },
    ],
  },
  {
    month: 'June 2020',
    list: [
      {
        shopping_id: '1',
        shopping_name: 'Grocery List',
        updated_at: 'TZ',
        status: 'completed',
      },
      {
        shopping_id: '2',
        shopping_name: 'Grocery List',
        updated_at: 'TZ',
        status: 'cancelled',
      },
    ],
  },
]

export const topSpends = {
  items: [
    {
      item_id: '1',
      name: 'Banana',
      percentage: 12,
    },
    {
      item_id: '2',
      name: 'Rice',
      percentage: 10,
    },
    {
      item_id: '3',
      name: 'Chicken 1kg',
      percentage: 8,
    },
  ],

  categories: [
    {
      category_id: '1',
      name: 'Fruit and vegetables',
      percentage: 23,
    },
    {
      category_id: '2',
      name: 'Meat and Fish',
      percentage: 14,
    },
    {
      category_id: '3',
      name: 'Pets',
      percentage: 11,
    },
  ],
}

export const monthlySpends = []
