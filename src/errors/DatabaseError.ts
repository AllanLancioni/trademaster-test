export class DatabaseError extends Error {

  constructor(message: string) {
    super('DatabaseError: ' + message)
  }

}