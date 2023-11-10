import Sidebar from './Sidebar'
import Aside from './Aside'
import classes from './layout.module.css'
import {Outlet, useNavigate} from '@solidjs/router'
import {onMount, type Component} from 'solid-js'

const Layout: Component<{}> = () => {
  const navigate = useNavigate()

  onMount(() => {
    navigate('/items')
  })
  return (
    <div class={classes.container}>
      <Sidebar />
      <Outlet />
      <Aside />
    </div>
  )
}

export default Layout
