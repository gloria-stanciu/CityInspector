'use strict'

const Joi = require('joi')

async function problemTypeValidate(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            points: Joi.number().integer().required(),
        })
        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    problemTypeValidate,
}