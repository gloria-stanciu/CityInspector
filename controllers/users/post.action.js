'use strict'

const { hash, argon2id } = require('argon2')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const User = require('../../models/users')


async function signUp(req, res){
    try{
        //Check if a user with the same username or email already exists
        const isUser = await User.query()
          .select('firstName', 'lastName', 'phoneNumber')
          .where('firstName', req.body.firstName)
          .orWhere('lastName', req.body.lastName)
          .orWhere('phoneNumber', req.body.phoneNumber)

        //If exists, a conflict will show up
        if (isUser.length !== 0) {
          if (isUser.find(user => user.phoneNumber === req.body.phoneNumber)) {
            return res.status(400).send('Phone number already in use')
          }
        }

        //Hash password
        const password = await hash(req.body.password, { type: argon2id })
        await User.query().insertGraph({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          password: password,
          isAdmin: req.body.isAdmin
        })
        return res.status(200).send('User created successfully!')
    }catch(err){
        res.status(500).send(err)
    }
}

async function login(req, res) {
  if (!req.body.phoneNumber) return res.status(400).send('Phone number required')
  if (!req.body.password) return res.status(400).send('Password required')
  try {
    const user = await User.query()
      .select('id', 'phoneNumber', 'password')
      .where('phoneNumber', req.body.phoneNumber)
      .first()

    if (user && (await argon2.verify(user.password, req.body.password))){
      const token = jwt.sign(
        {
          phoneNumber: user.phoneNumber,
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      )
      return res.status(200).send(token)
    } else return res.status(401).send('Phone number or password is invalid.')
  }catch (err) {
      console.log(err)
      res.status(500).send(err)
  }
}

module.exports = {signUp, login}