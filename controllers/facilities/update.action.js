'use strict'

const Facilities = require('../../models/facilities')

async function update(req, res){
    try{
        await Facilities.query()
            .where('id', req.params.id)
            .update(req.body)
        return res.status(200).send("Facility updated successfully")
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = {update}