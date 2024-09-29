import express from "express"
import { add, getAll, remove, get, edit } from "../controllers/todo.controller"

const router = express.Router()

router.get('/getAll', getAll)
router.get("/", get)
router.post('/', add)
router.delete('/', remove)
router.put('/', edit)

export { router as todoRouter }
