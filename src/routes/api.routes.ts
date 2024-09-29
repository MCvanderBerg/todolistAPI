import express, { Request, Response } from "express"
import { todoRouter } from "./todo.routes"

const routes = express.Router();

routes.use('/todo', todoRouter)

export { routes as apiRouter }
