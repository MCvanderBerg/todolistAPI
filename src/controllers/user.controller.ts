import { Request, Response } from "express"
import User from "../models/user.model"

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
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}

export { signup };
