import { v4 as uuidv4 } from "uuid"
//most of this is temporary
interface TodoI {
  id?: string,
  title: string,
  description: string,
  createdAt?: Date,
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

class Todo implements TodoI {
  public id: string;
  public title: string;
  public description: string;
  public createdAt: Date;

  constructor(title: string, description: string, createdAt?: Date) {
    this.id = uuidv4()
    this.title = title
    this.description = description
    this.createdAt = createdAt || new Date()
  }

  public setId(id: string) {
    this.id = id
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setDate(date: Date) {
    this.createdAt = date;
  }
}

const todos: Todo[] = [
  new Todo("Marry", "Marry Noeline", new Date("2023-09-28T10:30:00")),
  new Todo("Bella eet", "Give Bella food", new Date("2023-09-28T10:30:00")),
  new Todo("Go to the bathroom", "Wow this is a big one")
]

export { todos, Todo, TodoI };
