'use strict'

const Joi = require('joi')

async function facilityValidate(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(60)
                .required(),
            value: Joi.number()
                .integer()
                .positive()
                .required(),
        })
        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    facilityValidate,
}