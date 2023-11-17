import classes from './shopping-list.module.css'

export default function EmptyList() {
  return (
    <div class={classes.emptyBox}>
      <p class={classes.emptyText}>No items</p>
      <img src="empty-list.svg" alt="empty list" class={classes.emptyImg} />
    </div>
  )
}
