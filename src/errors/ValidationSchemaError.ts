import { ErrorObject } from "ajv"
 

export class ValidationSchemaError extends Error {

  constructor(message: string, public errors: ErrorObject[]) {

    super(message)
    this.name = 'ValidationSchemaError'
  }

}