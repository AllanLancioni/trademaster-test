import { ValidationSchemaError } from '../../errors/ValidationSchemaError';
import { Client } from '../../models/Client.model'
import { Table } from '../Table'
import Ajv, { JSONSchemaType} from 'ajv'
const ajv = new Ajv()

class ClientTable extends Table<Client> {

  private schema: JSONSchemaType<Client> = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      document: { type: 'string' },
      address: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' }
    },
    required: ['name', 'document', 'address', 'email', 'phone'],
    additionalProperties: true,
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