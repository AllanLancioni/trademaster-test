import { ValidationSchemaError } from '../../errors/ValidationSchemaError';
import { Transaction } from '../../models/Transaction.model'
import { Table } from '../Table'
import Ajv from 'ajv'
const ajv = new Ajv({ allowUnionTypes: true })

class TransactionTable extends Table<Transaction> {

  private schema = {
    type: 'object',
    properties: {
      client: { type: 'integer' },
      product: { type: 'integer' },
      date: { type: ['object', 'string'] },
      type: { type: 'string', enum: ['SELL', 'RENT'] },
      devolutionDate: { type: ['object', 'string', 'null'] },
      value: { type: 'number' },
      id: { type: 'integer', nullable: true },
      createdAt: { type: ['string', 'object'], nullable: true },
      updatedAt: { type: ['string', 'object'], nullable: true },
    },
    required: ['client', 'product', 'date', 'type'],
    additionalProperties: false,
    if: { properties: { type: {const: 'RENT'} } },
    then: { required: ['devolutionDate'] },
  }
  private validateSchema = ajv.compile(this.schema)

  constructor() {
    super('transactions')
  }

  // Overrides super validate method  
  protected validate(item: Transaction): boolean {    
    const validation = this.validateSchema(item)
    if (this.validateSchema.errors)
      throw new ValidationSchemaError('Invalid transaction schema!', this.validateSchema.errors)
    return validation
  }

}

export default new TransactionTable()