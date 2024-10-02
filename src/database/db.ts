import mysql, { ConnectionOptions } from 'mysql2';

const db = mysql.createConnection({
  user: 'root',
  password: 'Noeline101#',
  host: 'localhost',
  database: 'todoList'
})
db.connect((err) => {
  if (err) {
    console.log(err)
    throw err;
  }

  console.log("Connected to Azure database")
})


export default db;




