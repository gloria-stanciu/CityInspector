'use strict'

const User = require('../../models/users')

async function update(req, res){
    try{
        await User.query()
            .where('id', req.params.id)
            .update(req.body)
        return res.status(200).send("User updated successfully")
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = {update}