'use strict'

const {Model} = require('objection')

class Facilities extends Model{
    static get tableName(){
        return 'facilities'
    }

    static get relationMappings(){
        const transactions = require('./transactions')

        return {
            transactions: {
                relation: Model.HasManyRelation,
                modelClass: transactions,
                join: {
                    from: 'facilities.id',
                    to: 'transactions.usedFacility'
                },
            },
        }
    }
}

module.exports = Facilities