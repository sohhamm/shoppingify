export interface BaseCategory {
  category: string
  category_id: string
}

export interface Category extends BaseCategory {
  items: Item[]
}

export interface Item {
  id: string
  name: string
  image: string
  note: string
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
