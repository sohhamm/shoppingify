import EmptyList from './EmptyList'
import classes from './shopping-list.module.css'
import {A} from '@solidjs/router'
import {For, Match, Show, Switch, createSignal, onMount} from 'solid-js'
import {Pencil, Trash, Minus, Plus} from 'lucide-solid'
import {list} from '../../service/item'

interface ShoppingListProps {}

export default function ShoppingList({}: ShoppingListProps) {
  const [editing, setEditing] = createSignal(false)
  const [inputName, setInputName] = createSignal('')
  const [name, setName] = createSignal('Shopping List')

  const isEmptyList = () => !!!list?.length

  onMount(() => {
    // todo when the shopping list already has name, comes from db,
    // if(list.name) setEditing(false)
  })

  const handleSaveName = () => {
    // optimistic mutation
    setName(inputName)
    // todo api call to set name
    setInputName('')
    setEditing(false)
  }

  const handleDeleteItem = () => {}

  const handleReduceQty = () => {}

  const handleIncreaseQty = () => {}

  const handleCancel = () => {}

  const handleComplete = () => {
    // todo hit complete list api, save to history
  }

  return (
    <div class={classes.box}>
      <div class={classes.header}>
        <img src="/source.svg" alt="add item image" class={classes.headerImg} />

        <div class={classes.addItem}>
          <div class={classes.addItemText}>Didn’t find what you need?</div>
          <A href="add">
            <button class={classes.addItemCTA}>Add item</button>
          </A>
        </div>
      </div>

      <Show when={isEmptyList()}>
        <EmptyList />
      </Show>

      <Show when={!isEmptyList()}>
        <div class={classes.title}>
          <p>{name()}</p>
          <Pencil
            size={22}
            color="#34333A"
            onClick={() => setEditing(e => !e)}
            class={classes.editIcon}
          />
        </div>

        <div class={classes.categories}>
          <For each={list}>
            {category => {
              return (
                <div class={classes.category}>
                  <p class={classes.categoryName}>{category.category}</p>
                  <div class={classes.items}>
                    <For each={category.items}>
                      {item => (
                        <div class={classes.item}>
                          <Switch>
                            <Match when={!editing()}>
                              <div class={classes.itemCheckbox}>
                                <input type="checkbox" class={classes.itemCheck} />
                                <div class={classes.itemName}>{item.name}</div>
                              </div>
                              <button class={classes.qty}>{item.quantity} pcs</button>
                            </Match>
                            <Match when={editing()}>
                              <div class={classes.itemName}>{item.name}</div>
                              <div class={classes.qtyEditBox}>
                                <div class={classes.qtyEdit}>
                                  <div class={classes.qtyDel} onClick={handleDeleteItem}>
                                    <Trash size={18} color="#fff" />
                                  </div>
                                  <Minus
                                    size={18}
                                    color="#F9A109"
                                    class={classes.editIcon}
                                    onClick={handleReduceQty}
                                  />
                                  <button class={classes.qty}>{item.quantity} pcs</button>
                                  <Plus
                                    size={18}
                                    color="#F9A109"
                                    class={classes.editIcon}
                                    onClick={handleIncreaseQty}
                                  />
                                </div>
                              </div>
                              <button class={classes.editQty}>{item.quantity} pcs</button>
                            </Match>
                          </Switch>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              )
            }}
          </For>
        </div>
      </Show>

      <div class={classes.footer}>
        <Show when={editing()}>
          <div class={classes.inputBox}>
            <input
              type="text"
              class={classes.listNameInput}
              value={inputName()}
              onInput={e => setInputName(e.currentTarget.value)}
              placeholder="enter a name"
              disabled={isEmptyList()}
            />
            <button class={classes.ctaSave} onClick={handleSaveName} disabled={isEmptyList()}>
              Save
            </button>
          </div>
        </Show>

        <Show when={!editing()}>
          <div class={classes.ctaBox}>
            <button class={classes.ctaCancel} onClick={handleCancel}>
              cancel
            </button>
            <button class={classes.ctaComplete} onClick={handleComplete}>
              Complete
            </button>
          </div>
        </Show>
      </div>
    </div>
  )
}
