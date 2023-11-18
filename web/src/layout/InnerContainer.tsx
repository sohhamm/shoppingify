import classes from './layout.module.css'
import {JSXElement} from 'solid-js'

export default function InnerContainer(props: {children: JSXElement}) {
  return <div class={classes.innerContainer}>{props.children}</div>
}
