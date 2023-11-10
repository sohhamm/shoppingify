import Logo from '../assets/logo.svg'
import Cart from '../assets/cart.svg'
import classes from './layout.module.css'
import {List, History, LineChart} from 'lucide-solid'
import type {Component} from 'solid-js'

const Sidebar: Component<{}> = () => (
  <div class={classes.box}>
    <div>
      <Logo />
    </div>
    <div class={classes.menus}>
      <List size={26} />
      <History size={26} />
      <LineChart size={26} />
    </div>
    <div>
      <Cart />
    </div>
  </div>
)

export default Sidebar
