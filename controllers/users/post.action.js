'use strict'

const { hash, argon2id } = require('argon2')
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
        })
        return res.status(200).send('User created successfully!')
    }catch(err){
        res.send(err)
    }
}

module.exports = {signUp}