import {Pencil} from 'lucide-solid'
import classes from './shopping-list.module.css'
import {setStore} from '../../store'

interface ShoppingListProps {
  a?: any
}

export default function ShoppingList({}: ShoppingListProps) {
  const handleAddItem = () => {
    setStore('aside', 'addingNewItem', true)
  }

  return (
    <div class={classes.box}>
      <div class={classes.header}>
        <img src='/source.svg' alt='add item image' class={classes.headerImg} />

        <div class={classes.addItem}>
          <div class={classes.addItemText}>Didn’t find what you need?</div>
          <button class={classes.addItemCTA} onClick={handleAddItem}>
            Add item
          </button>
        </div>
      </div>

      <div class={classes.title}>
        <p>Shopping List</p>
        <Pencil size={24} color='#34333A' />
      </div>
    </div>
  )
}
