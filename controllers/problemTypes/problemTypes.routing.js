'use strict'

const { create } = require('./post.action')
const { getAll, getOne } = require('./get.action')
const {update} = require('./update.action')
const {remove} = require('./delete.action')
const {problemTypeValidate} = require('../../services/validate/problemType.validate')

module.exports = {
    '/':{
        get: {
            action: getAll,
            level: 'user'
        },
        post: {
            action: create,
            middlewares: [problemTypeValidate],
            level: 'admin'
        }
    },
    '/:id':{
        get: {
            action: getOne,
            level: 'user'
        },
        patch: {
            action: update,
            level: 'admin'
        },
        delete: {
            action: remove,
            level: 'admin'
        },
    },
}