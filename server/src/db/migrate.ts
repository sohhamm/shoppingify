import {migrate} from 'drizzle-orm/libsql/migrator'
import {db} from '.'

async function main() {
  try {
    await migrate(db, {migrationsFolder: 'src/db/migrations'})
    console.log('Tables migrated!')
    process.exit(0)
  } catch (error) {
    console.error('Error performing migration: ', error)
    process.exit(1)
  }
}

main()
