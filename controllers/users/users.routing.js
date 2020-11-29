  
const { signUp } = require('./post.action')

module.exports = {
    '/register': {
        post: {
            action: signUp,
            level: 'public',
        },
    },
}