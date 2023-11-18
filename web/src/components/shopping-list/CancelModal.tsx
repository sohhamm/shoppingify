import * as dialog from '@zag-js/dialog'
import classes from './shopping-list.module.css'
import {useMachine, normalizeProps} from '@zag-js/solid'
import {Portal} from 'solid-js/web'
import {createMemo, createUniqueId, Show} from 'solid-js'

export default function CancelModal() {
  const [state, send] = useMachine(dialog.machine({id: createUniqueId()}))

  const api = createMemo(() => dialog.connect(state, send, normalizeProps))

  return (
    <>
      <button {...api().triggerProps} class={classes.ctaCancel}>
        cancel
      </button>

      <Show when={api().isOpen}>
        <Portal>
          <div {...api().backdropProps} />
          <div {...api().positionerProps}>
            <div {...api().contentProps}>
              <h2 {...api().titleProps}>Are you sure that you want to cancel this list?</h2>

              <button {...api().closeTriggerProps}>X</button>

              <button>Save Changes</button>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  )
}
