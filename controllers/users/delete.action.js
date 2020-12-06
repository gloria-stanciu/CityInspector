'use strict'

const User = require('../../models/users')

async function remove(req, res){
    try{
        await User.query()
          .where('id', req.params.id)
          .del()
        return res.status(200).send("User deleted successfully");s
    }
    catch(err){
        return res.status(500).send(err)
    }
}

module.exports = {remove}