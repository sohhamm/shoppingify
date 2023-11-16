import classes from './shopping-list.module.css'
import {For, Match, Show, Switch, createSignal} from 'solid-js'
import {Pencil, Trash, Minus, Plus} from 'lucide-solid'
import {setStore} from '../../store'
import {list} from '../../service/item'

interface ShoppingListProps {}

export default function ShoppingList({}: ShoppingListProps) {
  const [editing, setEditing] = createSignal(true)
  const [inputName, setInputName] = createSignal('')
  const [name, setName] = createSignal('Shopping List')
  const handleAddItem = () => {
    setStore('aside', 'addingNewItem', true)
  }

  const handleSaveName = () => {
    // optimistic mutation
    setName(inputName)
    // todo api call to set name
    setInputName('')
  }

  return (
    <div class={classes.box}>
      <div class={classes.header}>
        <img src="/source.svg" alt="add item image" class={classes.headerImg} />

        <div class={classes.addItem}>
          <div class={classes.addItemText}>Didn’t find what you need?</div>
          <button class={classes.addItemCTA} onClick={handleAddItem}>
            Add item
          </button>
        </div>
      </div>

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
          {category => (
            <div class={classes.category}>
              <p class={classes.categoryName}>{category.category}</p>
              <div class={classes.items}>
                <For each={category.items}>
                  {item => (
                    <div class={classes.item}>
                      <Switch>
                        <Match when={!editing()}>
                          <div class={classes.itemName}>{item.name}</div>
                          <button class={classes.qty}>{item.quantity}</button>
                        </Match>
                        <Match when={editing()}>
                          <div class={classes.itemCheckbox}>
                            <input type="checkbox" class={classes.itemCheck} />
                            <div class={classes.itemName}>{item.name}</div>
                          </div>
                          <div class={classes.qtyEditBox}>
                            <div class={classes.qtyEdit}>
                              <div>
                                <Trash />
                              </div>

                              <Minus />
                              <button class={classes.qty}>{item.quantity} pcs</button>
                              <Plus />
                            </div>
                          </div>
                        </Match>
                      </Switch>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>

      <div class={classes.footer}>
        <Show when={editing()}>
          <div class={classes.inputBox}>
            <input
              type="text"
              class={classes.listNameInput}
              value={inputName()}
              onInput={e => setInputName(e.currentTarget.value)}
            />
            <button class={classes.saveBtn} onClick={handleSaveName}>
              Save
            </button>
          </div>
        </Show>

        <Show when={!editing()}>
          <div class={classes.ctaBox}>
            <button class={classes.completeBtn}>cancel</button>
            <button class={classes.cancelBtn}>Complete</button>
          </div>
        </Show>
      </div>
    </div>
  )
}
