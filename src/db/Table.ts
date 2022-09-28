import { ModelLike } from './../types/ModelLike';
type QueryFn<T> = (item: T, index: number) => boolean

export class Table<T> {

  private lastId: number = 0
  data: Array<T & ModelLike> = []

  constructor(public name: string) { }

  private validate(item: Partial<T> & ModelLike): boolean {
    return true
  }

  find(queryFn: QueryFn<T & ModelLike>): Array<T & ModelLike> {
    return this.data.filter(queryFn)
  }

  findOne(queryFn: QueryFn<T & ModelLike>): T & ModelLike | null {
    return this.data.find(queryFn) || null
  }

  insert(item: T & ModelLike) {
    this.validate(item)
    item.id = ++this.lastId
    item.createdAt = item.updatedAt = new Date()
    Object.freeze(item)
    this.data.push(item)
    return { insertedItem: item }
  }

  update(queryFn: QueryFn<T & ModelLike>, newData: Partial<T> & ModelLike, allowPartial: boolean = true) {
    const items = this.find(queryFn)
    if (allowPartial)
      for (const item of items) this.validate({ ...item, ...newData }) // Atomicity guarantee - validate all items beofre doing changes
    else
      this.validate(newData)

    this
      .find(queryFn)
      .map(item => ({ index: this.data.findIndex(x => x === item), item }))
      .forEach(({index, item}) => {
        this.data.splice(index, 1, { ...item, ...newData, updatedAt: new Date() })
      })

    return { updatedCount: items.length }

  }

  delete(queryFn: QueryFn<T>) {
    const indexes: number[] = this.find(queryFn).map(item => this.data.findIndex(x => x === item))
    for (const index of indexes)
      this.data.splice(index, 1)

    return { deletedCount: indexes.length }
  }


}
