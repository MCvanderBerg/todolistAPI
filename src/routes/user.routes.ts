import express from "express"
import { get, getAll, signup } from "../controllers/user.controller"

const router = express.Router()

router.post('/signup', signup)
router.get('/getAll', getAll)
router.get('/get', get)

export default router 
