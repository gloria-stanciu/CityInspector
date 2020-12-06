'use strict'

const ProblemTypes = require('../../models/problemTypes')

async function update(req, res){
    try{
        await ProblemTypes.query()
            .where('id', req.params.id)
            .update(req.body)
        return res.status(200).send("Problem type updated successfully")
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = {update}