import { default as productMigration } from "./ProductMigration"

export function runMigrations() {
  console.log('Running migrations...')
  productMigration()
}
