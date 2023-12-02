/* @refresh reload */
import {render} from 'solid-js/web'
import {Router} from '@solidjs/router'
import './global.css'
import App from './App'

// @ts-ignore
const root = document.getElementById('root')

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!,
)
