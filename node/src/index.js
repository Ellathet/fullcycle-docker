require('dotenv').config()

const express = require('express');

const PORT = 3000;
const app = express();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});


app.get('/', async (req, res) => {

  connection.query(`SHOW TABLES LIKE 'users'`, async (err, results) => {
    if (!results || results?.length === 0) {
      connection.query(`CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);`)
    }

    connection.query(`INSERT INTO users (name) VALUES ('john_doe');`, (err, results) => {
      if(err) {
        console.error('ERROR', err)
      } else {
        connection.query(`SELECT * FROM users`, (err, results) => {
          res.set('Content-Type', 'text/html');
          const allUsers = results.reduce((acc, u) => acc + `${u.name}<br/>`, '');

          res.send(Buffer.from(`<h1>Full Cycle Rocks!</h1>${allUsers}`));
        });
      }
    })
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

