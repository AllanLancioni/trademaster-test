// Database simulation
import { runMigrations } from './migrations';
import { Table } from './Table';
import * as tables from './tables'

class Database {

  tables: { [key: string]: Table<any> } = {
    ...tables,
    ...Object.values(tables).reduce((ac, x) => ({...ac, [x.name]: x}), {})
  }

  constructor() {}

}

runMigrations()


console.log(new Database().tables['products'].data)
// Exporting a Singleton
export default new Database()