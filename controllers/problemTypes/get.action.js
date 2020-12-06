'use strict'

const ProblemTypes = require('../../models/problemTypes')

async function getAll(req, res) {
    try {
        const problemTypes = await ProblemTypes.query();
        return res.status(200).send(problemTypes)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function getOne(req, res){
    try{
        const problemType = await ProblemTypes.query().where('id', req.params.id)
        return res.status(200).send(problemType)
    }
    catch(err){
        return res.status(500).send(err)
    }
  }

module.exports = {
    getAll, getOne
}