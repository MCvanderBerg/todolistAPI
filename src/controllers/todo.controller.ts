import { Request, Response } from "express"
import { Todo, todos } from "../models/todo.models"

const getAll = (_: Request, res: Response) => {
  res.status(200).json(todos)
}

const add = (req: Request, res: Response) => {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).send("title and description has to be given")
  }

  todos.push(new Todo(title, description, new Date()))
  return res.status(200).send("Successfully added new Todo to todolist")
}

const remove = (req: Request, res: Response) => {
  const { id } = req.body

  if (!id) {
    return res.status(500).send("no id provided")
  }

  const index = todos.findIndex(todo => todo.id !== id)

  if (index === -1) {
    return res.status(501).send("no such id exists")
  }

  todos.splice(index, 1)

  res.status(200).send("Successfully removed todo")
}

const get = (req: Request, res: Response) => {
  const { id } = req.body

  if (!id) {
    return res.status(500).send("Error: no id provided")
  }

  const index = todos.findIndex(todo => todo.id === id)

  if (index === -1) {
    return res.status(501).send("Error: no todo with this id")
  }

  res.status(200).json(todos[index])
}

const edit = (req: Request, res: Response) => {
  const { id, title, description } = req.body

  if (!id) {
    return res.status(200).send("Error: no id provided")
  }

  if (!title && !description) {
    return res.status(503).send("Error: no changes send")
  }

  const index = todos.findIndex(todo => todo.id === id)

  if (index === -1) {
    return res.status(500).send("Error: no todo with this id")
  }

  todos[index].title = title
  todos[index].description = description

  return res.status(200).send(`Edited todo with id ${id} successfully`)
}

export { getAll, add, remove, get, edit };
