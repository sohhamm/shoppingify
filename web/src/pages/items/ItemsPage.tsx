import InnerContainer from '../../layout/InnerContainer'
import ContentContainer from '../../layout/ContentContainer'
import classes from './items.module.css'
import {Outlet, useNavigate} from '@solidjs/router'
import {For, Match, Show, Switch, createSignal} from 'solid-js'
import {Plus, X, Search} from 'lucide-solid'
import {createItemsQuery} from '../../service/item'
import type {BaseCategory} from '../../types'

export default function ItemsPage() {
  const [search, setSearch] = createSignal('')
  const navigate = useNavigate()

  const itemQuery = createItemsQuery()

  const handleViewItem = (item: {item_id: string; name: string}, _category: BaseCategory) => {
    navigate(`/items/${item.item_id}`, {replace: true})
  }

  return (
    <InnerContainer>
      <ContentContainer className={classes.box}>
        <header class={classes.header}>
          <h1 class={classes.heading}>
            <span>Shoppingify</span>
            {` `}
            allows you take your shopping list wherever you go
          </h1>
          <div class={classes.searchBox}>
            <Search size={24} color="#34333a" class={classes.searchIcon} />
            <input
              type="text"
              name="search"
              id="search"
              class={classes.search}
              placeholder="search items"
              value={search()}
              onInput={e => setSearch(e.currentTarget.value)}
            />
            <Show when={search().length > 0}>
              <X size={24} color="#34333a" class={classes.searchCloseIcon} />
            </Show>
          </div>
        </header>
        <main class={classes.categories}>
          <Switch>
            <Match when={itemQuery.status === 'pending'}>Loading...</Match>
            <Match when={itemQuery.error instanceof Error}>
              <span>Error: {(itemQuery.error as Error).message}</span>
            </Match>
            <Match when={itemQuery.data !== undefined}>
              <For each={itemQuery.data}>
                {category => (
                  <div class={classes.category}>
                    <h2 class={classes.categoryName}>{category.category_name}</h2>
                    <div class={classes.items}>
                      <For each={category.items}>
                        {item => (
                          <div
                            class={classes.item}
                            onClick={() =>
                              handleViewItem(item, {
                                category: category.category_name,
                                category_id: category.category_id,
                              })
                            }
                          >
                            <div class={classes.itemName}>{item.name}</div>
                            <Plus size={24} color="#C1C1C4" />
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </Match>
          </Switch>
        </main>
      </ContentContainer>

      <Outlet />
    </InnerContainer>
  )
}
