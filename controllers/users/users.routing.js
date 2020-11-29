  
const { signUp, login } = require('./post.action')

module.exports = {
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