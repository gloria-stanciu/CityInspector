'use strict'

const jwt = require('jsonwebtoken')
const Users = require('./models/users')

const levelFcts = {
    public: (req, res, next) => next(),
    user: async (req, res, next) => {
        const token = req.headers['authorization'].split(' ')[1];

        try{
            jwt.verify(token, process.env.JWT_SECRET)

            const decoded = jwt.decode(token)
            const user = await Users.query().where('id', decoded.id)
            if(user)
                next()
        }catch(error){
            console.log(error)
            return res.status(401).send(error)
        }
    },
    admin: async (req, res, next) =>{
        console.log(req.headers['authorization'].split(' ')[1])
        const token = req.headers['authorization'].split(' ')[1];

        try{
            jwt.verify(token, process.env.JWT_SECRET)

            const decoded = jwt.decode(token)
            const user = await Users.query().where('id', decoded.id)
            console.log(user)
            console.log(user.isAdmin)
            if (user[0].isAdmin === true)
            {
                next()
            } else {
                res.status(401).send('Not authorized') 
            }
        } catch(error) {
            console.log(error)
            return res.status(401).send(error)
        }
        
    }
};

module.exports = level => (req, res, next) => levelFcts[level](req, res, next);