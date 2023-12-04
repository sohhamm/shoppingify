import * as combobox from '@zag-js/combobox'
import classes from './add-item.module.css'
import {normalizeProps, useMachine} from '@zag-js/solid'
import {SubmitHandler, createForm, valiForm} from '@modular-forms/solid'
import {createMemo, createSignal, createUniqueId, For, Show} from 'solid-js'
import {ChevronDown, X} from 'lucide-solid'
import {AddItemSchema, type TAddItem} from './schema'
import {createItemMutation} from '../../service/item'
import {createCategoryQuery} from '../../service/category'

export default function AddItem() {
  const [_itemForm, {Form, Field, FieldArray: _fieldArray}] = createForm<TAddItem>({
    validate: valiForm(AddItemSchema),
  })

  const [categorySearch, setCategorySearch] = createSignal('')

  const addItem = createItemMutation()

  const categoryOptions = createCategoryQuery({search: categorySearch()})
  // const [options, setOptions] = createSignal(categoryOptions.data)

  const handleSubmit: SubmitHandler<TAddItem> = (values, event) => {
    // prevent browser refresh
    event.preventDefault()
    // todo Runs on client
    console.log(values)

    debugger

    addItem.mutate(values)
    // @ts-ignore
    window.history.back()
  }

  const collection = createMemo(() =>
    combobox.collection({
      items: categoryOptions.data || [],
      itemToValue: item => item.category_id,
      itemToString: item => item.category_name,
    }),
  )

  const [state, send] = useMachine(
    combobox.machine({
      name: 'category_id',
      id: createUniqueId(),
      collection: collection(),
      onOpenChange(_details) {
        // if (!details.open) return
        // setOptions(comboboxData)
      },
      onInputValueChange({value}) {
        setCategorySearch(value.toLowerCase())
        // const filtered = comboboxData.filter(item =>
        //   item.category.toLowerCase().includes(value.toLowerCase()),
        // )
        // setOptions(filtered.length > 0 ? filtered : comboboxData)
      },
    }),
  )

  const comboboxApi = createMemo(() => combobox.connect(state, send, normalizeProps))

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
                <Show when={categoryOptions.data && categoryOptions.data.length > 0}>
                  <div {...comboboxApi().contentProps} class={classes.categories}>
                    <For each={categoryOptions.data}>
                      {item => (
                        <div {...comboboxApi().getItemProps({item})} class={classes.category}>
                          {item.category_name}
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
            <button
              class={classes.ctaCancel}
              onClick={() => {
                // @ts-ignore
                history.back()
              }}
            >
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
