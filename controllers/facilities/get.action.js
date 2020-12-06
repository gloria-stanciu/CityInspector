'use strict'

const Facilities = require('../../models/facilities')

async function getOne(req, res) {
    try {
        const facility = await Facilities.query().where('id', req.params.id)
        return res.status(200).send(facility)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function getAll(req, res){
    try{
        const facilities = await Facilities.query()
        return res.status(200).send(facilities);
    }
    catch(err){
        return res.status(500).send(err);
    }
  }

module.exports = {
    getOne, getAll
}