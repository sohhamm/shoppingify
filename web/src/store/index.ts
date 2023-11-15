import {createStore} from 'solid-js/store'
import {ItemCategory} from '../types'

interface AppState {
  aside: {
    addingNewItem: boolean
    editingItem: boolean
  }
  item: ItemCategory | null
}

export const [store, setStore] = createStore<AppState>({
  // ui state for aside
  aside: {
    addingNewItem: false,
    editingItem: false,
  },
  item: null,
})
