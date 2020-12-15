'use strict'

const { create } = require('./post.action')
const { getAll, getProblemsFromUser } = require('./get.action')
const {update} = require('./update.action')
const {remove} = require('./delete.action')
const {problemValidate} = require('../../services/validate/problem.validate')

module.exports = {
    '/':{
        get: {
            action: getAll,
            level: 'user'
        },
    },
    '/:userId':{
        get: {
            action: getProblemsFromUser,
            level: 'user'
        },
        post: {
            action: create,
            middlewares: [problemValidate],
            level: 'user'
        },
    },
    '/:id':{
        patch: {
            action: update,
            level: 'user'
        },
        delete: {
            action: remove,
            level: 'admin'
        },
    },
}