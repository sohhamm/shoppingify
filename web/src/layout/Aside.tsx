import ShoppingList from '../components/shopping-list/ShoppingList'
import ItemDetails from '../components/item-details/ItemDetails'
import AddItem from '../components/add-item/AddItem'
import classes from './layout.module.css'
import {Switch, Match} from 'solid-js'
import {store} from '../store'

export default function Aside() {
  const viewingItem = () => !!store.item

  return (
    <div class={classes.aside}>
      <Switch>
        <Match when={!store.aside.addingNewItem && !viewingItem()}>
          <ShoppingList />
        </Match>
        <Match when={store.aside.addingNewItem}>
          <AddItem />
        </Match>
        <Match when={viewingItem()}>
          <ItemDetails />
        </Match>
      </Switch>
    </div>
  )
}
