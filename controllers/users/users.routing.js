'use strict'

const { signUp, login } = require('./post.action')
const { getUser, getAll } = require('./get.action')
const {update} = require('./update.action')
const {remove} = require('./delete.action')
const {userValidate} = require('../../services/validate/user.validate')

module.exports = {
    '/':{
        get: {
            action: getAll,
            level: 'admin'
        }
    },
    '/:id':{
        get: {
            action: getUser,
            level: 'user'
        },
        patch: {
            action: update,
            level: 'user'
        },
        delete: {
            action: remove,
            level: 'admin'
        },
    },
    '/register': {
        post: {
            action: signUp,
            middlewares: [userValidate],
            level: 'public',
        },
    },
    '/login': {
        post: {
            action: login,
            level: 'public',
        },
    },
}