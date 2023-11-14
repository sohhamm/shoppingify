import classes from './shopping-list.module.css'

interface ShoppingListProps {
  a?: any
}

export default function ShoppingList({}: ShoppingListProps) {
  return <div class={classes.box}>first</div>
}
