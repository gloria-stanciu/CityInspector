'use strict'

const { create } = require('./post.action')
const { getAll, getOne, getTransactionsFromUser } = require('./get.action')

module.exports = {
    '/':{
        get: {
            action: getAll,
            level: 'admin'
        },
    },
    '/user/:userId':{
        get:{
            action: getTransactionsFromUser,
            level: 'user'
        },
    },
    '/:id':{
        get: {
            action: getOne,
            level: 'user'
        },
        post: {
            action: create,
            level: 'user'
        },
    },
}