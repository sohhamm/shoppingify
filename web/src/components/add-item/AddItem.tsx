import classes from './add-item.module.css'

interface AddItemProps {
  a?: any
}

export default function AddItem({}: AddItemProps) {
  return <div class={classes.box}>AddItem</div>
}
