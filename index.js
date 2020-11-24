require('dotenv').config()
const express= require('express');
const app = express();
app.listen(3000, process.env.HOST || 'localhost');

app.get('/', function (req, res) {
    res.send('Hello World!')
  })