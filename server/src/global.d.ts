import {Env, env} from 'bun'

declare module 'bun' {
  interface Env {
    TURSO_DB_URL: string
    TURSO_DB_AUTH_TOKEN: string
  }
}
