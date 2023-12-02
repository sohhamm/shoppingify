// import {unwrap} from 'solid-js/store'
import classes from './item-details.module.css'
import {useParams} from '@solidjs/router'
import {createItemQuery} from '../../service/item'
import {MoveLeft} from 'lucide-solid'
import {Match, Show, Switch} from 'solid-js'

export default function ItemDetails() {
  const itemId = useParams().itemId

  const itemQuery = createItemQuery(itemId)

  const handleBack = () => {
    // @ts-ignore
    window.history.back()
  }

  const handleDeleteItem = () => {
    //  todo: mutation with item_id
  }

  const handleAddToList = () => {
    //  todo: mutation with item_id
  }

  return (
    <div class={classes.box}>
      <button class={classes.btn} onClick={handleBack}>
        <MoveLeft color="#F9A109" size={20} /> back
      </button>

      <Switch>
        <Match when={itemQuery.status === 'pending'}>Loading...</Match>
        <Match when={itemQuery.error instanceof Error}>
          <span>Error: {(itemQuery.error as Error).message}</span>
        </Match>
        <Match when={itemQuery.data !== undefined}>
          <img
            src={itemQuery.data?.image || '/empty-item-img.png'}
            alt={itemQuery.data?.name}
            class={classes.itemImg}
          />
          <div class={classes.innerBox}>
            <div>
              <p class={classes.title}>name</p>
              <p class={classes.name}>{itemQuery.data?.name}</p>
            </div>

            <div>
              <p class={classes.title}>category</p>
              <p class={classes.desc}>{itemQuery.data?.category_name}</p>
            </div>

            <Show when={!!itemQuery.data?.note}>
              <div>
                <p class={classes.title}>note</p>
                <p class={classes.desc}>{itemQuery.data?.note}</p>
              </div>
            </Show>
          </div>
        </Match>
      </Switch>

      <div class={classes.cta}>
        <button class={classes.ctaDel} onClick={handleDeleteItem}>
          delete
        </button>
        <button class={classes.ctaAdd} onClick={handleAddToList}>
          Add to list
        </button>
      </div>
    </div>
  )

  // return (
  //   <>
  //     {(item: ItemCategory) => (
  //       <div class={classes.box}>
  //         <button class={classes.btn} onClick={handleBack}>
  //           <MoveLeft color='#F9A109' size={20} /> back
  //         </button>
  //         <img src={item.image} alt={item.name} class={classes.itemImg} />
  //         <div class={classes.innerBox}>
  //           <div>
  //             <p class={classes.title}>name</p>
  //             <p class={classes.name}>{item.name}</p>
  //           </div>

  //           <div>
  //             <p class={classes.title}>category</p>
  //             <p class={classes.desc}>{item.category}</p>
  //           </div>

  //           <Show when={!!item.note}>
  //             <div>
  //               <p class={classes.title}>note</p>
  //               <p class={classes.desc}>{item.note}</p>
  //             </div>
  //           </Show>
  //         </div>

  //         <div class={classes.cta}>
  //           <button class={classes.ctaDel} onClick={handleDeleteItem}>
  //             delete
  //           </button>
  //           <button class={classes.ctaAdd} onClick={handleAddToList}>
  //             Add to list
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // )
}
