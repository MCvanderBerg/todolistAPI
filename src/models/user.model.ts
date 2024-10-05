import validator from "validator";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid'
import db from "../database/db";

type Gender = 'male' | 'female'
type Name = string;
type Surname = string;
type Email = string;
type Hash = string;
type Password = string;
type Id = string;

interface UserI {
  getId: () => Id,
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
  private id: Id
  private name: Name
  private surname: Surname
  private email: Email
  private hash: Hash
  private gender: Gender

  constructor(name: Name, surname: Surname, email: Email, hash: Hash, gender: Gender) {
    this.id = uuidv4();
    this.name = name
    this.surname = surname
    this.email = email
    this.hash = hash // should be hashed
    this.gender = gender
  }

  public getId() {
    return this.id
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
    // TODO: check if email already exists in db
    // TODO: check each not null values and if its being send 

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = new User(name, surname, email, hash, gender)

    db.query(`
     insert into users(id, name, surname, email, password, gender) 
      values(?,?,?,?,?,?)
             `, Object.values(newUser),
      (err, result) => {
        if (err) {
          console.error(err)
          throw Error(err.message)
        }
      },)

    return newUser
  }
}

export default User;

