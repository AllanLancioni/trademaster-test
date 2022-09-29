import { Transaction } from './../../models/Transaction.model';
import { TransactionTable } from '../tables'
import chalk from 'chalk'

const data: Transaction[] = [
  {
    client: 1,
    product: 2,
    date: new Date(),
    type: 'SELL',
    devolutionDate: null,
    value: 10
  }

]

export default function migration() {

  for (const item of data) {    
    TransactionTable.insert(item)
  }

  console.log(chalk.bold.green('OK!'), 'Transaction migration finished!')
}
