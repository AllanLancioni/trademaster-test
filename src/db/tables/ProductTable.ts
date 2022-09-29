import { ValidationSchemaError } from './../../errors/ValidationSchemaError';
import { Product } from '../../models/Product.model'
import { Table } from '../Table'
import Ajv, { JSONSchemaType} from 'ajv'
const ajv = new Ajv()

class ProductTable extends Table<Product> {

  private schema: JSONSchemaType<Product> = {
    type: 'object',
    properties: {
      title: {type: 'string'},
      category: {type: 'string' },
      img: {type: 'string', nullable: true },
      type: {type: 'string', enum: ['MOVIE', 'DVD', 'BOOK']},
      priceRentPerDay: {type: 'number' },
      priceSell: {type: 'number' },
      isAvailableForRent: {type: 'boolean' },
      isAvailableForSell: {type: 'boolean' },
      qtdRented: {type: 'number' },
      qtdStock: {type: 'number' },
    },
    required: ['title', 'category', 'type', 'priceRentPerDay', 'priceSell', 'isAvailableForRent', 'isAvailableForSell', 'qtdStock'],
    additionalProperties: true,
  }
  private validateSchema = ajv.compile(this.schema)

  constructor() {
    super('products')
  }

  // Overrides super validate method  
  protected validate(item: Product): boolean {    
    const validation = this.validateSchema(item)
    if (this.validateSchema.errors)
      throw new ValidationSchemaError('Invalid product schema!', this.validateSchema.errors)
    return validation
  }

}

export default new ProductTable()