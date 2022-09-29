import { Client } from "../../models/Client.model"
import { ClientTable } from '../tables'
import chalk from 'chalk'

const data: Client[] = [
  {
    name: 'Allan Lancioni',
    document: '000.000.000-00',
    address: 'Rua João Machado Alves, 200',
    email: 'allanlancioni@example.com',
    phone: '11 99999-9999'
  }

]

export default function migration() {

  for (const item of data) {
    ClientTable.insert(item)
  }

  console.log(chalk.bold.green('OK!'), 'Client migration finished!')
}
