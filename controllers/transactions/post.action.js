'use strict'

const Transactions = require('../../models/transactions')


async function create(req, res){
    try{
        await Transactions.query().insertGraph({
          userId: req.params.userId,
          usedFacility: req.body.usedFacility,
        })
        return res.status(200).send('Transaction created successfully!')
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {create}