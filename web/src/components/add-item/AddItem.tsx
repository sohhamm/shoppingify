import * as combobox from '@zag-js/combobox'
import classes from './add-item.module.css'
import {normalizeProps, useMachine} from '@zag-js/solid'
import {SubmitHandler, createForm, valiForm} from '@modular-forms/solid'
import {createMemo, createSignal, createUniqueId, For, Show} from 'solid-js'
import {ChevronDown, X} from 'lucide-solid'
import {setStore} from '../../store'
import {AddItemSchema, type TAddItem} from './schema'

const comboboxData = [
  {category: 'Fruits and vegetables', category_id: '1'},
  {category: 'Meat and fish', category_id: '2'},
  {category: 'Beverages', category_id: '3'},
]

export default function AddItem() {
  const [options, setOptions] = createSignal(comboboxData)

  const [_itemForm, {Form, Field, FieldArray: _fieldArray}] = createForm<TAddItem>({
    validate: valiForm(AddItemSchema),
  })

  const handleSubmit: SubmitHandler<TAddItem> = (values, event) => {
    // prevent browser refresh
    event.preventDefault()
    // todo Runs on client
    console.log(values)
  }

  const collection = createMemo(() =>
    combobox.collection({
      items: options(),
      itemToValue: item => item.category_id,
      itemToString: item => item.category,
    }),
  )

  const [state, send] = useMachine(
    combobox.machine({
      id: createUniqueId(),
      collection: collection(),
      onOpenChange(details) {
        if (!details.open) return
        setOptions(comboboxData)
      },
      onInputValueChange({value}) {
        const filtered = comboboxData.filter(item =>
          item.category.toLowerCase().includes(value.toLowerCase()),
        )
        setOptions(filtered.length > 0 ? filtered : comboboxData)
      },
    }),
  )

  const comboboxApi = createMemo(() => combobox.connect(state, send, normalizeProps))

  const handleCancel = () => {
    setStore('aside', 'addingNewItem', false)
  }

  return (
    <div class={classes.box}>
      <h1 class={classes.title}>Add a new item</h1>

      <Form class={classes.form} onSubmit={handleSubmit}>
        <Field name="name">
          {(field, props) => (
            <div class={classes.inputBox}>
              <label for="name" class={`${classes.label} ${classes.labelRequired}`}>
                Name
              </label>
              <input
                {...props}
                type="text"
                name="Name"
                id="name"
                class={classes.inputText}
                placeholder="Enter a name"
                required
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>

        <Field name="category_id">
          {(field, props) => (
            <div class={classes.inputBox}>
              <div {...comboboxApi().rootProps} id="category">
                <label
                  {...comboboxApi().labelProps}
                  class={`${classes.label} ${classes.labelRequired}`}
                >
                  Category
                </label>
                <div {...comboboxApi().controlProps} class={classes.inputBoxCategory}>
                  <input
                    {...props}
                    {...comboboxApi().inputProps}
                    class={classes.inputText}
                    placeholder="Enter a category"
                  />

                  <Show when={!comboboxApi().isOpen}>
                    {/* @ts-ignore */}
                    <span {...comboboxApi().triggerProps} class={classes.categoryDropdownIcon}>
                      <ChevronDown color="#828282" size={24} />
                    </span>
                  </Show>

                  <Show when={comboboxApi().isOpen}>
                    {/* @ts-ignore */}
                    <span {...comboboxApi().triggerProps} class={classes.categoryDropdownIcon}>
                      <X color="#828282" size={24} />
                    </span>
                  </Show>
                  {field.error && <div>{field.error}</div>}
                </div>
              </div>
              <div {...comboboxApi().positionerProps}>
                <Show when={options().length > 0}>
                  <div {...comboboxApi().contentProps} class={classes.categories}>
                    <For each={options()}>
                      {item => (
                        <div {...comboboxApi().getItemProps({item})} class={classes.category}>
                          {item.category}
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            </div>
          )}
        </Field>

        <Field name="note">
          {(field, props) => (
            <div class={classes.inputBox}>
              <label for="note" class={classes.label}>
                Note
              </label>
              <textarea
                {...props}
                id="note"
                class={classes.inputTextarea}
                placeholder="Enter a note (optional)"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>

        <Field name="image">
          {(field, props) => (
            <div class={classes.inputBox}>
              <label for="image" class={classes.label}>
                Image
              </label>
              <input
                type="text"
                id="image"
                class={classes.inputText}
                placeholder="Enter an image url (optional)"
                {...props}
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <div class={classes.footer}>
          <div class={classes.ctaBox}>
            <button class={classes.ctaCancel} onClick={handleCancel}>
              cancel
            </button>
            <button type="submit" class={classes.ctaSave}>
              Save
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}
