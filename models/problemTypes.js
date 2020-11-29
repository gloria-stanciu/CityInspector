'use strict'

const {Model} = require('objection')

class ProblemTypes extends Model{
    static get tableName(){
        return 'problemTypes'
    }

    static get relationMappings(){
        const problems = require('./problems')

        return {
            problems: {
                relation: Model.HasManyRelation,
                modelClass: problems,
                join: {
                    from: 'problemTypes.id',
                    to: 'problems.id'
                },
            },
        }
    }
}

module.exports = ProblemTypes