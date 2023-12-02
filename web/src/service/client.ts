import {edenTreaty} from '@elysiajs/eden'
import type {Server} from '../../../server/src'

export const app = edenTreaty<Server>(import.meta.env.VITE_API_URL)
