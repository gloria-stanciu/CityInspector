'use strict'

const Joi = require('joi')

async function problemValidate(req, res, next) {
    try {
        const schema = Joi.object({
            typeId: Joi.number().integer().positive().required(),
            description: Joi.string().min(3).max(255).required(),
            lat: Joi.number().required(),
            long: Joi.number().required()
        })
        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    problemValidate,
}