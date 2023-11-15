// import {unwrap} from 'solid-js/store'
import {setStore, store} from '../../store'
import classes from './item-details.module.css'
import {MoveLeft} from 'lucide-solid'
import {Show} from 'solid-js'

export default function ItemDetails() {
  const handleBack = () => {
    setStore('item', null)
  }

  const handleDeleteItem = () => {
    //  todo: mutation with item_id
  }

  const handleAddToList = () => {
    //  todo: mutation with item_id
  }

  if (!store.item) return null

  return (
    <div class={classes.box}>
      <button class={classes.btn} onClick={handleBack}>
        <MoveLeft color='#F9A109' size={20} /> back
      </button>
      <img src={store.item.image} alt={store.item.name} class={classes.itemImg} />
      <div class={classes.innerBox}>
        <div>
          <p class={classes.title}>name</p>
          <p class={classes.name}>{store.item.name}</p>
        </div>

        <div>
          <p class={classes.title}>category</p>
          <p class={classes.desc}>{store.item.category}</p>
        </div>

        <Show when={!!store.item.note}>
          <div>
            <p class={classes.title}>note</p>
            <p class={classes.desc}>{store.item.note}</p>
          </div>
        </Show>
      </div>

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
