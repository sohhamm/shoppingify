import {createStore} from 'solid-js/store'
import {ItemCategory} from '../types'

interface AppStore {
  aside: {
    addingNewItem: boolean
    editingItem: boolean
  }
  item: ItemCategory | null
}

export const [store, setStore] = createStore<AppStore>({
  // ui state for aside
  aside: {
    addingNewItem: false,
    editingItem: false,
  },
  item: null,
})

// used to store the edited state, and must sync with local storage
interface ShoppingStore {}

export const [shoppingStore, setShoppingStore] = createStore<ShoppingStore>({})
