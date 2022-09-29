import { default as transactionMigration } from "./TransactionMigration"
import { default as productMigration } from "./ProductMigration"
import { default as clientMigration } from "./ClientMigration"
import chalk from 'chalk'

export function runMigrations() {
  console.log(chalk.bold.blue('Running migrations...'))

  try {
    productMigration()
    clientMigration()
    transactionMigration()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }

}
