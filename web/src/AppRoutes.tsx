import Items from './pages/items/ItemsPage'
import History from './pages/history/HistoryPage'
import Stats from './pages/stats/Stats'
import Layout from './layout/Layout'
import ShoppingList from './components/shopping-list/ShoppingList'
import AddItem from './components/add-item/AddItem'
import ItemDetails from './components/item-details/ItemDetails'
import {Routes, Route, Navigate} from '@solidjs/router'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={Layout}>
        <Route path="/" element={<Navigate href={() => '/items'} />} />;
        <Route path="/items" component={Items}>
          <Route path="/" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
          <Route path="/:itemId" component={ItemDetails} />
        </Route>
        <Route path="/history" component={History}>
          <Route path="/" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
          <Route path="/:historyId" component={AddItem} />
        </Route>
        <Route path="/stats" component={Stats}>
          <Route path="/" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
        </Route>
      </Route>
    </Routes>
  )
}
