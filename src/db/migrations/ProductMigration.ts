import { Product, ProductType } from "../../models/Product.model"
import { ProductTable } from '../tables'

const data: Product[] = [
  {
    title: 'string',
    type: ProductType.MOVIE,
    category: 'COMEDY',
    img: 'asdfasf',
    priceSell: 10,
    priceRentPerDay: 10,
    isAvailableForSell: true,
    isAvailableForRent: true,
    qtdStock: 10,
    qtdRented: 0
  }

]

export default function migration() {
  console.log('Running product migration...')

  for (const item of data) {    
    ProductTable.insert(item)
  }

  console.log('Produict migration finished!')
}
