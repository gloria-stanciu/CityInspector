require('dotenv').config()

const express= require('express');
const bodyParser = require('body-parser');
const Knex = require('knex');
const knexConfig = require('./knexfile')
const {Model} = require('objection')
const morgan = require('morgan')
const helmet = require('helmet')
const lumie = require('lumie')
const path = require('path' )

const app = express();
const knex = Knex(knexConfig);

Model.knex(knex)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(helmet())

lumie.load(app, {
  preURL: 'api',
  verbose: true,
  ignore: ['*.spec', '*.action', '*.validate'],
  controllers_path: path.join(__dirname, 'controllers'),
})

async function main(){
  console.info('Loading...')
  console.info('Checking database connection!\n')
  try{
    await knex.raw('SELECT 1+1 AS RESULT')
    const server = await app.listen(process.env.PORT)
    console.log(`Server started: http://localhost:${server.address().port}/`)
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}

main()
