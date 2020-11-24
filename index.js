require('dotenv').config()
const express= require('express');
const app = express();
app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

app.get('/', function (req, res) {
    res.send("Hello world")
  })