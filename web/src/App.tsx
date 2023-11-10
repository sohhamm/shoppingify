import {Routes, Route} from '@solidjs/router'
import Layout from './layout/Layout'
import Items from './pages/items/Items'
import History from './pages/history/History'
import Stats from './pages/stats/Stats'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/items' element={<Items />} />
        <Route path='/history' element={<History />} />
        <Route path='/stats' element={<Stats />} />
      </Route>
    </Routes>
  )
}
