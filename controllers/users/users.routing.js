'use strict'

const { signUp, login } = require('./post.action')
const { getUser, getAll } =require('./get.action')

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
        } 
    },
    '/register': {
        post: {
            action: signUp,
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