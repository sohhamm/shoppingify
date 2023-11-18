import classes from './layout.module.css'
import {JSXElement} from 'solid-js'

export default function ContentContainer(props: {children: JSXElement; className?: string}) {
  return <div class={`${classes.content} ${props.className}`}>{props.children}</div>
}
