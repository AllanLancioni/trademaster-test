import { ModelLike } from './../../types/ModelLike';
import { ValidationSchemaError } from './../../errors/ValidationSchemaError';
import { Product } from '../../models/Product.model'
import { Table } from '../Table'
import Ajv from 'ajv'
const ajv = new Ajv({ allowUnionTypes: true })

class ProductTable extends Table<Product> {

  private schema = {
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
      qtyRented: {type: 'integer' },
      qtyStock: {type: 'integer' },
      id: { type: 'integer', nullable: true },
      createdAt: { type: ['string', 'object'], nullable: true },
      updatedAt: { type: ['string', 'object'], nullable: true },
    },
    required: ['title', 'category', 'type', 'priceRentPerDay', 'priceSell', 'isAvailableForRent', 'isAvailableForSell', 'qtyStock'],
    additionalProperties: false,
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