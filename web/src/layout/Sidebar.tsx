import Tooltip from '../components/tooltip/Tooltip'
import Logo from '../assets/logo.svg'
import classes from './layout.module.css'
import {A} from '@solidjs/router'
import {List, History, LineChart, ShoppingCart} from 'lucide-solid'
import {For, createSignal} from 'solid-js'

export default function Sidebar() {
  const [cartNo, _setCartNo] = createSignal(3)

  const links = [
    {
      href: '/items',
      icon: <List size={26} color="#454545" />,
      tooltip: 'item',
    },
    {
      href: '/history',
      icon: <History size={26} color="#454545" />,
      tooltip: 'history',
    },
    {
      href: '/stats',
      icon: <LineChart size={26} color="#454545" />,
      tooltip: 'statistics',
    },
  ]

  return (
    <div class={classes.sidebarBox}>
      <div>
        <Logo />
      </div>
      <div class={classes.menus}>
        <For each={links}>
          {link => (
            <Tooltip id={link.tooltip} content={link.tooltip}>
              <A href={link.href} activeClass={classes.activeLink}>
                {link.icon}
              </A>
            </Tooltip>
          )}
        </For>
      </div>
      <div class={classes.cart}>
        <ShoppingCart size={20} color="white" class={classes.cartIcon} />

        <div class={classes.cartNo}>{cartNo()}</div>
      </div>
    </div>
  )
}
