'use strict'

const Joi = require('joi')

async function transactionValidate(req, res, next) {
    try {
        const schema = Joi.object({
            usedFacility: Joi.number().integer().positive().required(),
        })
        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    transactionValidate,
}