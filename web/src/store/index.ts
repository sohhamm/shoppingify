import {createStore} from 'solid-js/store'

// used to store the edited state, and must sync with local storage
interface ShoppingStore {}

export const [shoppingStore, setShoppingStore] = createStore<ShoppingStore>({})
