import { Client } from "./Client.model"
import { Product } from "./Product.model"

export interface Transaction {
  client: number
  product: number
  date: Date
  type: 'SELL' | 'RENT'
  devolutionDate: Date | null,
  value: number
}

export interface TransactionPopulated extends Omit<Transaction, 'client' | 'product'> {
  client: Client
  product: Product
}