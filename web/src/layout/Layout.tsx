import Sidebar from './Sidebar'
import Aside from './Aside'
import classes from './layout.module.css'
import {Outlet, useNavigate} from '@solidjs/router'
import {type Component} from 'solid-js'

const Layout: Component<{}> = () => {
  const navigate = useNavigate()
  navigate('/items')

  return (
    <div class={classes.container}>
      <Sidebar />
      <div class={classes.content}>
        <Outlet />
      </div>
      <Aside />
    </div>
  )
}

export default Layout
