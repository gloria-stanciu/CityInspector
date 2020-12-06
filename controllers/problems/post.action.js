'use strict'

const Problems = require('../../models/problems')


async function create(req, res){
    try{
        await Problems.query().insertGraph({
          typeId: req.body.typeId,
          userId: req.params.userId,
          description: req.body.description,
          lat: req.body.lat,
          long: req.body.long
        })
        return res.status(200).send('Problem created successfully!')
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {create}