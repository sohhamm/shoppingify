import Items from './pages/items/Items'
import History from './pages/history/History'
import Stats from './pages/stats/Stats'
import Layout from './layout/Layout'
import {Routes, Route, Navigate} from '@solidjs/router'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Navigate href={() => '/items'} />} />;
        <Route path='/items' element={<Items />} />
        <Route path='/history' element={<History />} />
        <Route path='/stats' element={<Stats />} />
      </Route>
    </Routes>
  )
}
