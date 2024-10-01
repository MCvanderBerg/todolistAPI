import express, { Request, Response } from "express"
import todoRouter from "./todo.routes"
import userRouter from "./user.routes"

const routes = express.Router();

routes.use('/user', userRouter)
routes.use('/todo', todoRouter)

export default routes 
