import classes from './shopping-list.module.css'

interface EmptyListProps {}

export default function EmptyList({}: EmptyListProps) {
  return <div class={classes.box}>first</div>
}
