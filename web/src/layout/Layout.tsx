import Sidebar from './Sidebar'
import classes from './layout.module.css'
import {Outlet} from '@solidjs/router'

export default function Layout() {
  return (
    <div class={classes.container}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
