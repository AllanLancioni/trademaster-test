import { default as productMigration } from "./ProductMigration"
import { default as clientMigration } from "./ClientMigration"
import chalk from 'chalk'

export function runMigrations() {
  console.log(chalk.bold.blue('Running migrations...'))
  productMigration()
  clientMigration()
}
