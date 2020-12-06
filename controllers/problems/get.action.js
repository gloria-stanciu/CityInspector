'use strict'

const Problems = require('../../models/problems')

async function getAll(req, res) {
    try {
        const problems = await Problems.query();
        return res.status(200).send(problems)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function getProblemsFromUser(req, res){
    try{
        const problem = await Problems.query().where('userId', req.params.userId)
        return res.status(200).send(problem)
    }
    catch(err){
        return res.status(500).send(err)
    }
}

module.exports = {
    getAll, getProblemsFromUser
}