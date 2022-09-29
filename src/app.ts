import express, { Router, Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import ProductController from './controllers/ProductController'
import ClientController from './controllers/ClientController'
import TransactionController from './controllers/TransactionController'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

dotenv.config()

const app: Express = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/product', (
  Router()
    .get('/', ProductController.get)
    .get('/:id', ProductController.getById)
    .post('/', ProductController.create)
    .put('/:id', ProductController.update)
    .delete('/:id', ProductController.delete)
  )
)

app.use('/client', (
  Router()
    .get('/', ClientController.get)
    .get('/:id', ClientController.getById)
    .post('/', ClientController.create)
    .put('/:id', ClientController.update)
    .delete('/:id', ClientController.delete)
  )
)

app.use('/transaction', (
  Router()
    .get('/', TransactionController.get)
    .get('/:id', TransactionController.getById)
    .post('/', TransactionController.registerTransaction)
  )
)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Server running!` })
})

export default app