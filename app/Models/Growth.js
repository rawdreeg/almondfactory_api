'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Growth extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    strain() {
        return this.hasOne('App/Models/Strain')
    }
}

module.exports = Growth
