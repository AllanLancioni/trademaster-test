import { ValidationSchemaError } from '../../errors/ValidationSchemaError';
import { Client } from '../../models/Client.model'
import { Table } from '../Table'
import Ajv from 'ajv'
const ajv = new Ajv({ allowUnionTypes: true })

class ClientTable extends Table<Client> {

  private schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      document: { type: 'string' },
      address: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      id: { type: 'integer', nullable: true },
      createdAt: { type: ['string', 'object'], nullable: true },
      updatedAt: { type: ['string', 'object'], nullable: true },
    },
    required: ['name', 'document', 'address', 'email', 'phone'],
    additionalProperties: false,
  }
  private validateSchema = ajv.compile(this.schema)

  constructor() {
    super('clients')
  }

  // Overrides super validate method  
  protected validate(item: Client): boolean {    
    const validation = this.validateSchema(item)
    if (this.validateSchema.errors)
      throw new ValidationSchemaError('Invalid client schema!', this.validateSchema.errors)
    return validation
  }

}

export default new ClientTable()