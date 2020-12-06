'use strict'

const Problems = require('../../models/problems')

async function remove(req, res){
    try{
        await Problems.query()
          .where('id', req.params.id)
          .del()
        return res.status(200).send("Problem deleted successfully");s
    }
    catch(err){
        return res.status(500).send(err)
    }
}

module.exports = {remove}