import {Env, env} from 'bun'

declare module 'bun' {
  interface Env {
    DB_URL: string
    DB_AUTH: string
  }
}
