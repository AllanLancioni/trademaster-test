import { ModelLike } from './../types/ModelLike';
import { Product } from './../models/Product.model';
import { Request, Response } from "express";
import db from '../db/Database'
import { Table } from "../db/Table";
import handleQueryParams from '../helpers/handleQueryParams';

const productTable: Table<Product & ModelLike> = db.getTable('products')

class ProductController {

  get(req: Request, res: Response) {

    const query = handleQueryParams(req.query, ['title'])

    const data = productTable.find((item: any) => Object
      .entries(query)
      .every(([k, v]) => typeof v === 'string' ? (item[k] || '').toString().toLowerCase() === v.toLowerCase() : v.test(item[k]))
    )

    return res.json({
      data,
      count: data.length
    })
  }

  getById(req: Request, res: Response) {
    const data = productTable.findOne(({ id }) => id === +req.params.id)
    if (data)
      return res.json(data)
    return res.status(422).json({ message: 'Entity not found!' })
  }

  create(req: Request, res: Response) {
    try {
      const response = productTable.insert(req.body)
      return res.json(response)
    } catch ({ name, message, errors }) {
      return res.status(400).json({ name, message, errors })
    }
  }

  update(req: Request, res: Response) {
    try {
      const response = productTable.update(({ id }) => id === +req.params.id, req.body)
      return res.json(response)
    } catch ({ name, message, errors }) {
      return res.status(400).json({ name, message, errors })
    }
  }

  delete(req: Request, res: Response) {
    try {
      const response = productTable.delete(({ id }) => id === +req.params.id)
      return res.json(response)
    } catch ({ name, message, errors }) {
      return res.status(400).json({ name, message, errors })
    }
  }

}


export default new ProductController()