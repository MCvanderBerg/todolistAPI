import express, { Request, Response } from "express"
import todoRouter from "./todo.routes"
import userRouter from "./user.routes"
import db from "../database/db"

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  db.query(`select * from test`, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: `error 400` })
    }

    if (!result) {
      console.log("no result returned")
      return res.status(401).json({ error: `no result returned` })
    }

    return res.status(200).json({ data: result })
  })
})


routes.use('/user', userRouter)
routes.use('/todo', todoRouter)

export default routes 
