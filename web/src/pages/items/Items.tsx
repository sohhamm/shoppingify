import classes from './items.module.css'
import {Component, For, Show, createSignal} from 'solid-js'
import {Plus, X, Search} from 'lucide-solid'
import {items} from '../../service/item'

const Items: Component<{}> = () => {
  const [search, setSearch] = createSignal('')

  return (
    <div class={classes.box}>
      <header class={classes.header}>
        <h1 class={classes.heading}>
          <span>Shoppingify </span>
          allows you take your shopping list wherever you go
        </h1>
        <div class={classes.searchBox}>
          <Search size={24} color='#34333a' class={classes.searchIcon} />
          <input
            type='text'
            name='search'
            id='search'
            class={classes.search}
            placeholder='search items'
            value={search()}
            onInput={e => setSearch(e.currentTarget.value)}
          />
          <Show when={search().length > 0}>
            <X size={24} color='#34333a' class={classes.searchCloseIcon} />
          </Show>
        </div>
      </header>

      <main class={classes.categories}>
        <For each={items}>
          {category => (
            <div class={classes.category}>
              <h2 class={classes.categoryName}>{category.category}</h2>
              <div class={classes.items}>
                <For each={category.items}>
                  {item => (
                    <div class={classes.item}>
                      <div class={classes.itemName}>{item.name}</div>
                      <Plus size={24} color='#C1C1C4' />
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </main>
    </div>
  )
}

export default Items
