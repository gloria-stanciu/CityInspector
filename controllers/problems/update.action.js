'use strict'

const Problems = require('../../models/problems')

async function update(req, res){
    try{
        await Problems.query()
            .where('id', req.params.id)
            .update(req.body)
        return res.status(200).send("Problem updated successfully")
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = {update}