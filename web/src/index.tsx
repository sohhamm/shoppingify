/* @refresh reload */
import {render} from 'solid-js/web'
import {Navigate, Route, Router} from '@solidjs/router'
import './global.css'
import Layout from './layout/Layout'
import AddItem from './components/add-item/AddItem'
import ItemDetails from './components/item-details/ItemDetails'
import ShoppingList from './components/shopping-list/ShoppingList'
import Stats from './pages/stats/Stats'
import ItemsPage from './pages/items/ItemsPage'
import HistoryPage from './pages/history/HistoryPage'
import App from './App'

// @ts-ignore
const root = document.getElementById('root')

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Layout}>
        <Route path="/" component={() => <Navigate href={() => '/items'} />} />;
        <Route path="/items" component={ItemsPage}>
          <Route path="/" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
          <Route path="/:itemId" component={ItemDetails} />
        </Route>
        <Route path="/history" component={HistoryPage}>
          <Route path="/" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
          <Route path="/:historyId" component={AddItem} />
        </Route>
        <Route path="/stats" component={Stats}>
          <Route path="/" component={ShoppingList} />
          <Route path="/add" component={AddItem} />
        </Route>
      </Route>
    </Router>
  ),
  root!,
)
