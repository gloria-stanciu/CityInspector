'use strict'

const Facilities = require('../../models/facilities')

async function remove(req, res){
    try{
        await Facilities.query()
          .where('id', req.params.id)
          .del()
        return res.status(200).send("Facility deleted successfully");
    }
    catch(err){
        return res.status(500).send(err)
    }
}

module.exports = {remove}