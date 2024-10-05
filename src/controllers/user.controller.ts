import { Request, Response } from "express"
import User from "../models/user.model"
import jwt from "jsonwebtoken";
import db from "../database/db";

const createToken = (id: string) => {
  return jwt.sign({ id }, "secret", { expiresIn: "3d" })
}

const signup = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    surname,
    email,
    password,
    gender
  } = req.body

  try {
    const get = await User.signup(name, surname, email, password, gender)
    const token = createToken(get.getId())

    res.status(200).json({ get, token })
  } catch (err) {
    res.status(500).json({
      error: (err as { message: string }).message
    })
  }
}

const getAll = (req: Request, res: Response) => {
  const query = "select * from users"

  let users: object[];
  db.query(query, (err: object, result: object[]) => {
    if (err) {
      res.status(401).json({ error: "could get all users" })
    }
    users = result
    res.status(200).json({ users })
  })
}

const get = (req: Request, res: Response) => {
  const { id = "" } = req.body;
  const query = `select * from users where id=?`

  if (!id) {
    res.status(400).json({ error: "no id provided" })
  }

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    return res.status(200).json({ user: result })
  })



}

export { signup, getAll, get };
