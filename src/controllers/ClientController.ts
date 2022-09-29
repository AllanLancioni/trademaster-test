import { ModelLike } from './../types/ModelLike';
import { Client } from './../models/Client.model';
import { Request, Response } from "express";
import db from '../db/Database'
import { Table } from "../db/Table";
import handleQueryParams from '../helpers/handleQueryParams';

const clientTable: Table<Client & ModelLike> = db.getTable('clients')

class ClientController {

  get(req: Request, res: Response) {

    const query = handleQueryParams(req.query, ['name', 'address'])

    console.log({query})

    const data = clientTable.find((item: any) => Object
      .entries(query)
      .every(([k, v]) => typeof v === 'string' ? (item[k] || '').toString().toLowerCase() === v.toLowerCase() : v.test(item[k]))
    )

    return res.json({
      data,
      count: data.length
    })
  }

  getById(req: Request, res: Response) {
    const data = clientTable.findOne(({ id }) => id === +req.params.id)
    if (data)
      return res.json(data)
    return res.status(422).json({ message: 'Entity not found!' })
  }

  create(req: Request, res: Response) {
    try {
      const response = clientTable.insert(req.body)
      return res.json(response)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }

  update(req: Request, res: Response) {
    try {
      const response = clientTable.update(({ id }) => id === +req.params.id, req.body)
      return res.json(response)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }

  delete(req: Request, res: Response) {
    try {
      const response = clientTable.delete(({ id }) => id === +req.params.id)
      return res.json(response)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }

}


export default new ClientController()