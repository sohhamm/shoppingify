import {For} from 'solid-js'
import classes from './history.module.css'
import {Outlet} from '@solidjs/router'
import ContentContainer from '../../layout/ContentContainer'
import InnerContainer from '../../layout/InnerContainer'
import {shoppingHistory} from '../../service/item'
import {ChevronRight, CalendarDays} from 'lucide-solid'

export default function History() {
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
                      <div class={classes.list}>
                        <CalendarDays />
                        <div class={classes.itemName}>{list.shopping_name}</div>
                        <div>
                          <div>Mon 27.8.2020</div>
                          <div>completed</div>

                          <ChevronRight />
                        </div>
                      </div>
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
