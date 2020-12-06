'use strict'

const Users= require('../../models/users')

async function getUser(req, res) {
    try {
        const user = await Users.query().where('id', req.params.id)
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function getAll(req, res){
    try{
        const users = await Users.query()
        return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send(err)
    }
  }

module.exports = {
    getUser, getAll
}