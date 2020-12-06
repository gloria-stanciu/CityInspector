'use strict'

const Transactions = require('../../models/transactions')

async function getOne(req, res) {
    try {
        const transaction = await Transactions.query().where('id', req.params.id)
        return res.status(200).send(transaction)
    } catch (err){
        return res.status(500).send(err)
    }
}

async function getAll(req, res){
    try{
        const transaction = await Transactions.query()
        return res.status(200).send(transaction);
    }
    catch(err){
        return res.status(500).send(err);
    }
}

async function getTransactionsFromUser(req, res){
    try{
        const problem = await Transactions.query().where('userId', req.params.userId)
        return res.status(200).send(problem)
    }
    catch(err){
        return res.status(500).send(err)
    }
}

module.exports = {
    getOne, getAll, getTransactionsFromUser
}