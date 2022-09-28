import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import db from './db/Database'

dotenv.config()
console.log(db)

const app: Express = express()
const PORT = process.env.PORT


app.get('/', (req: Request, res: Response) => {
  res.json({ message: `Server running at port ${PORT}!` })
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
})
