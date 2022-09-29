import { DatabaseError } from '../errors/DatabaseError';
import { runMigrations } from './migrations';
import { Table } from './Table';
import * as tables from './tables'

class Database {

  private tables: { [key: string]: Table<any> } = {
    ...tables,
    ...Object.values(tables).reduce((ac, x) => ({...ac, [x.name]: x}), {})
  }

  getTable(tableName: string) {
    const table = this.tables[tableName]
    if (!table)
      throw new DatabaseError(`Table ${tableName} does not exists on database!`)
    return table
  }

  constructor() {}

}

runMigrations()

// Exporting a Singleton
export default new Database()