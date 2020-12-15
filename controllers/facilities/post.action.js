    'use strict'

const Facilities = require('../../models/facilities')

async function create(req, res){
    try{
        await Facilities.query().insertGraph({
          name: req.body.name,
          value: req.body.value,
        })
        return res.status(200).send('Facility created successfully!')
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {create}