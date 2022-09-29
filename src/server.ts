import express, { Router, Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk'
import ProductController from './controllers/ProductController'
import ClientController from './controllers/ClientController'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Server running at port ${PORT}!` })
})

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running at ${chalk.bold(`https://localhost:${PORT}`)}`))
})
