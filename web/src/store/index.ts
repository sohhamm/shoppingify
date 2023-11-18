import {createStore} from 'solid-js/store'
import {ItemCategory} from '../types'

interface ItemStore {
  item: ItemCategory | null
}

export const [store, setStore] = createStore<ItemStore>({
  item: null,
})

// used to store the edited state, and must sync with local storage
interface ShoppingStore {}

export const [shoppingStore, setShoppingStore] = createStore<ShoppingStore>({})
