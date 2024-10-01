import validator from "validator";
import bcrypt from "bcrypt";

type Gender = 'male' | 'female'
type Name = string;
type Surname = string;
type Email = string;
type Hash = string;
type Password = string;

interface UserI {
  getName: () => Name,
  getSurname: () => Surname,
  getEmail: () => Email,
  getGender: () => Gender,
  setName: (name: Name) => void,
  setSurname: (surname: Surname) => void,
  setEmail: (email: Email) => void,
  setGender: (gender: Gender) => void,
}


class User implements UserI {
  private name: Name
  private surname: Surname
  private email: Email
  private hash: Hash
  private gender: Gender

  constructor(name: Name, surname: Surname, email: Email, hash: Hash, gender: Gender) {
    this.name = name
    this.surname = surname
    this.email = email
    this.hash = hash // should be hashed
    this.gender = gender
  }

  public getName() {
    return this.name
  }

  public getSurname() {
    return this.surname
  }

  public getEmail() {
    return this.email
  }

  public getGender() {
    return this.gender
  }

  public setName(name: Name) {
    this.name = name
  }

  public setSurname(surname: Surname) {
    this.surname = surname
  }

  public setEmail(email: Email) {
    this.email = email
  }

  public setGender(gender: Gender) {
    this.gender = gender
  }

  public static async signup(
    name: Name,
    surname: Surname,
    email: Email,
    password: Password,
    gender: Gender
  ): Promise<User> {
    console.log("signing up")

    if (!email || !password) {
      throw Error("Error: please provide all properties required")
    }

    if (!validator.isEmail(email)) {
      throw Error(`Error: ${email} is not a valid email`)
    }

    // TODO: check if its a strong password

    if (users.some(user => user.email === email)) {
      throw Error("Error: email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = new User(name, surname, email, hash, gender)
    users.push(newUser)

    return newUser

  }
}

export default User;

export const users: User[] = [
  new User("Christiaan", "van der Berg", "christiaan26c@gmail.com", "Christiaan123", "male"),
  new User("Noeline", "Rossouw", "noelinerossouw101@gmail.com", "Noeline123", "female"),
  new User("Test", "TestSurname", "test@gmail.com", "Test123", "male"),
]
