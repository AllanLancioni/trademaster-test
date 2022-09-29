import { Product } from './../models/Product.model';
import { ModelLike } from '../types/ModelLike';
import { Transaction, TransactionPopulated } from '../models/Transaction.model';
import { Request, Response } from "express";
import db from '../db/Database'
import { Table } from "../db/Table";
import handleQueryParams from '../helpers/handleQueryParams';
import { Client } from '../models/Client.model';
import { RuleError } from '../errors/RuleError';

const transactionTable: Table<Transaction & ModelLike> = db.getTable('transactions')
const productsTable: Table<Product & ModelLike> = db.getTable('products')
const clientsTable: Table<Client & ModelLike> = db.getTable('clients')

class TransactionController {

  get(req: Request, res: Response) {

    const query = handleQueryParams(req.query, ['name', 'address'])

    const data = transactionTable.find((item: any) => Object
      .entries(query)
      .every(([k, v]) => {
        if (k === 'minDate')
          return new Date(item.date) >= new Date(v as string)
        if (k === 'maxDate')
          return new Date(item.date) <= new Date(v as string)
        return typeof v === 'string' ? (item[k] || '').toString().toLowerCase() === v.toLowerCase() : v.test(item[k])
      })
    )

    return res.json({
      totalValue: data.reduce((ac, { value }) => ac + value, 0),
      count: data.length,
      data,
    })
  }

  getById(req: Request, res: Response) {
    const data = transactionTable.findOne(({ id }) => id === +req.params.id)
    if (data) {
      const populatedData: TransactionPopulated = {
        ...data,
        product: productsTable.findOne(x => x.id === data.product),
        client: clientsTable.findOne(x => x.id === data.client)
      }
      return res.json(populatedData)
    }
    return res.status(422).json({ message: 'Entity not found!' })
  }

  registerTransaction(req: Request, res: Response) {

    try {

      const transactionDate: Date = req.body.date ? new Date(req.body.date) : new Date()
      const data: Omit<Transaction, 'value'> = { 
        ...req.body,
        date: transactionDate,
        devolutionDate: req.body.devolutionDate ? new Date(req.body.devolutionDate) : null
      }

      if (data.type === 'RENT' && data.devolutionDate) { 
        const nextMonth = new Date(transactionDate.getFullYear(), transactionDate.getMonth() + 1, transactionDate.getDate())
        if (new Date(data.devolutionDate) < transactionDate || data.devolutionDate > nextMonth)
          throw new RuleError('DevolutionDate must be between transactionDate and a month from now!')
      }

      const product = productsTable.findOne(x => x.id === data.product)
      const client = clientsTable.findOne(x => x.id === data.client)

      if (!product)
        throw new RuleError(`Product (id = ${data.product}) not found!`)
      if (!product.qtyStock)
        throw new RuleError(`Product "${product.title}" out of stock!`)      
      if (product.qtyStock <= product.qtyRented)
        throw new RuleError(`Product "${product.title}" out of stock - Awaiting return of ${product.qtyRented} items!`)
      if (!client)
        throw new RuleError(`Client (id = ${data.client}) not found!`)

      let response

      if (data.type === 'SELL') {
        response = transactionTable.insert({ ...data, value: product.priceSell })
        productsTable.update(x => x.id === product.id, { qtyStock: product.qtyStock - 1 })
      } else {
        const differenceInDays = Math.ceil((+(data.devolutionDate as Date) - +transactionDate) / (1000 * 3600 * 24))
        response = transactionTable.insert({ ...data, value: +(product.priceRentPerDay * differenceInDays).toFixed(2) })
        productsTable.update(x => x.id === product.id, { qtyRented: product.qtyRented + 1 })
      }
    
      return res.json(response)
    } catch ({ name, message, errors }) {
      return res.status(400).json({ name, message, errors })
    }
  }
  
}


export default new TransactionController()