import { Product } from "../../models/Product.model"
import { Table } from "../Table"

class ProductTable extends Table<Product> {

  constructor() {
    super('products')
  }

}

export default new ProductTable()