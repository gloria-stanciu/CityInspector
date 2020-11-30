const Users= require('../../models/users')
const jwt = require('jsonwebtoken')

async function getUser(req, res) {
    try {
        const user = await Users.query().where('id', req.params.id)

        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function getAll(req, res){
    const users = await Users.query()
    return res.status(200).send(users);
  }

module.exports = {
    getUser, getAll
}