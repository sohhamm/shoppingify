export interface BaseCategory {
  category: string
  category_id: string
}

export interface Category extends BaseCategory {
  items: Item[]
}

export interface Item {
  item_id: string
  name: string
  image: string | null
  note: string | null
  created_at: string
}

export interface ItemCategory extends Item {
  category: string
  category_id: string
}

export interface ShoppingItem extends Item {
  quantity: number
}

export interface ShoppingCategory extends BaseCategory {
  items: ShoppingItem[]
}
