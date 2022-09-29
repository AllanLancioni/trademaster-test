import { Product, ProductType } from "../../models/Product.model"
import { ProductTable } from '../tables'
import chalk from 'chalk'

const data: Product[] = [
  {
    title: 'Movie 1',
    type: 'MOVIE',
    category: 'COMEDY',
    img: null,
    priceSell: 10,
    priceRentPerDay: 10,
    isAvailableForSell: true,
    isAvailableForRent: true,
    qtyStock: 3,
    qtyRented: 0
  },

  {
    title: 'Movie 2',
    type: 'MOVIE',
    category: 'COMEDY',
    img: null,
    priceSell: 10,
    priceRentPerDay: 10,
    isAvailableForSell: true,
    isAvailableForRent: true,
    qtyStock: 10,
    qtyRented: 0
  }

]

export default function migration() {

  for (const item of data) {    
    ProductTable.insert(item)
  }

  console.log(chalk.bold.green('OK!'), 'Product migration finished!')
}
