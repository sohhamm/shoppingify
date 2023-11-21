import {Outlet} from '@solidjs/router'
import ContentContainer from '../../layout/ContentContainer'
import InnerContainer from '../../layout/InnerContainer'
import classes from './stats.module.css'
import {For, createSignal} from 'solid-js'
import {SolidApexCharts} from 'solid-apexcharts'
import {topSpends} from '../../service/item'

export default function Stats() {
  const [options] = createSignal({
    chart: {
      id: 'solidchart-example',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  })
  const [series] = createSignal({
    list: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
    ],
  })
  return (
    <InnerContainer>
      <ContentContainer>
        <main class={classes.box}>
          <div class={classes.topSpends}>
            <div>
              <h1>Top items</h1>
              <div class={classes.items}>
                <For each={topSpends.items}>
                  {item => (
                    <div class={classes.item}>
                      <div class={classes.itemLabelBox}>
                        <label for="spends">{item.name}</label>

                        <p>{`${item.percentage}%`}</p>
                      </div>

                      <progress
                        id="spends"
                        max={100}
                        value={item.percentage}
                        class={classes.itemProgress}
                      />
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div>
              <h1>Top categories</h1>
              <div class={classes.items}>
                <For each={topSpends.categories}>
                  {category => (
                    <div class={classes.item}>
                      <div class={classes.itemLabelBox}>
                        <label for="spends">{category.name}</label>

                        <p>{`${category.percentage}%`}</p>
                      </div>

                      <progress
                        id="spends"
                        max={100}
                        value={category.percentage}
                        class={`${classes.itemProgress} ${classes.itemProgress2}`}
                      />
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>

          <div class={classes.chart}>
            <h1>Monthly Spends</h1>
            <SolidApexCharts
              width="100%"
              height="302"
              type="line"
              options={options()}
              series={series().list}
            />
            ;
          </div>
        </main>
      </ContentContainer>
      <Outlet />
    </InnerContainer>
  )
}
