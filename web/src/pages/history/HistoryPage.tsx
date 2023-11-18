import {For} from 'solid-js'
import classes from './history.module.css'
import {A, Outlet} from '@solidjs/router'
import ContentContainer from '../../layout/ContentContainer'
import InnerContainer from '../../layout/InnerContainer'
import {shoppingHistory} from '../../service/item'
import {ChevronRight, CalendarDays} from 'lucide-solid'

export default function HistoryPage() {
  return (
    <InnerContainer>
      <ContentContainer>
        <h1 class={classes.heading}>Shopping history</h1>
        <main class={classes.histories}>
          <For each={shoppingHistory}>
            {months => (
              <div class={classes.months}>
                <p class={classes.monthName}>{months.month}</p>
                <div class={classes.lists}>
                  <For each={months.list}>
                    {list => (
                      <A href={list.shopping_id} class={classes.link}>
                        <div class={classes.list}>
                          <div class={classes.itemName}>{list.shopping_name}</div>
                          <div class={classes.listDetails}>
                            <CalendarDays color="var(--disabled-color)" size={24} />
                            <div class={classes.date}>Mon 27.8.2020</div>
                            <div
                              classList={{
                                [classes.completed]: list.status === 'completed',
                                [classes.cancelled]: list.status === 'cancelled',
                              }}
                            >
                              {list.status}
                            </div>
                            <ChevronRight
                              color="var(--primary-color)"
                              size={24}
                              class={classes.chevronRight}
                            />
                          </div>
                        </div>
                      </A>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </main>
      </ContentContainer>

      <Outlet />
    </InnerContainer>
  )
}
