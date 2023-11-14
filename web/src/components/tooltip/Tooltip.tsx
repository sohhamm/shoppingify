import * as tooltip from '@zag-js/tooltip'
import classes from './tooltip.module.css'
import {normalizeProps, useMachine} from '@zag-js/solid'
import {createMemo, Show, children} from 'solid-js'
import type {Component, JSXElement} from 'solid-js'

const Tooltip: Component<{children: JSXElement; id: string; content: string}> = props => {
  const [state, send] = useMachine(
    tooltip.machine({id: `tooltip-${props.id}`, positioning: {placement: 'right'}}),
  )
  const api = createMemo(() => tooltip.connect(state, send, normalizeProps))

  const resolved = children(() => props.children)
  return (
    <div class={classes.container}>
      {/* @ts-ignore */}
      <span {...api().triggerProps}>{resolved()}</span>
      <Show when={api().isOpen}>
        <div {...api().positionerProps}>
          <div {...api().arrowProps} class={classes.tooltipArrow}>
            <div {...api().arrowTipProps} />
          </div>
          <div {...api().contentProps}>{props.content}</div>
        </div>
      </Show>
    </div>
  )
}

export default Tooltip
