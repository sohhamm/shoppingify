import Sidebar from './Sidebar'
import classes from './layout.module.css'

export default function Layout(props) {
  return (
    <div class={classes.container}>
      <Sidebar />
      {props.children}
    </div>
  )
}
