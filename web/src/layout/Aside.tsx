import classes from './layout.module.css'
// import headerImg from '../assets/source.svg'
import {Switch, Match} from 'solid-js'

export default function Aside() {
  const addingNew = false
  const viewingItemDetails = false
  const handleAddItem = () => {}

  return (
    <div class={classes.aside}>
      <div class={classes.header}>
        <img src='public/source.svg' alt='add item image' class={classes.headerImg} />

        <div class={classes.addItem}>
          <div class={classes.addItemText}>Didn’t find what you need?</div>
          <button class={classes.addItemCTA} onClick={handleAddItem}>
            Add item
          </button>
        </div>
      </div>

      <Switch fallback={<div>Empty List</div>}>
        <Match when={!addingNew && !viewingItemDetails}>
          <div></div>
        </Match>
        <Match when={addingNew}>
          <div></div>
        </Match>
        <Match when={viewingItemDetails}>
          <div></div>
        </Match>
      </Switch>
    </div>
  )
}
