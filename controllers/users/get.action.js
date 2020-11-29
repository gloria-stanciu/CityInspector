const { Users } = require('@models')
// const jwt = require('jsonwebtoken')

async function getUser(req, res) {
    // const token = req.header('x-access-token')
    // const decoded = jwt.decode(token)

    try {
        const user = await Users.findByPk(decoded.id)

        if (!user) return res.status(401).send('Token not valid.')

        return res.status(200).send({
            username: user.username,
            full_name: user.full_name,
            email: user.email,
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    getUser,
}