'use strict'

const ProblemTypes = require('../../models/problemTypes')


async function create(req, res){
    try{
        await ProblemTypes.query().insertGraph({
          name: req.body.name,
          points: req.body.points,
        })
        return res.status(200).send('Problem type created successfully!')
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {create}