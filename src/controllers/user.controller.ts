import { Request, Response } from "express"
import User, { users } from "../models/user.model"

const signup = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    surname,
    email,
    password,
    gender
  } = req.body

  try {
    const user = await User.signup(name, surname, email, password, gender)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({
      error: (err as { message: string }).message
    })
  }
}

const getAll = (req: Request, res: Response) => {
  res.status(200).send()
}

export { signup };
