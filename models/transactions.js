'use strict'

const {Model} = require('objection')

class Transactions extends Model {
    static get tableName(){
        return 'problems'
    }

    static get relationMappings() {
        const users = require('./users')
        const facilities = require('./facilities')

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'transactions.userId',
                    to: 'users.id'
                }
            },
            facilities: {
                relation: Model.BelongsToOneRelation,
                modelClass: facilities,
                join: {
                    from: 'transactions.usedFacility',
                    to: 'facilities.id'
                }
            }
        }
    }
}

module.exports = Transactions