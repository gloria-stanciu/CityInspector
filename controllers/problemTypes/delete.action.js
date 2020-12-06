'use strict'

const ProblemTypes = require('../../models/problemTypes')

async function remove(req, res){
    try{
        await ProblemTypes.query()
          .where('id', req.params.id)
          .del()
        return res.status(200).send("Problem type deleted successfully");s
    }
    catch(err){
        return res.status(500).send(err)
    }
}

module.exports = {remove}