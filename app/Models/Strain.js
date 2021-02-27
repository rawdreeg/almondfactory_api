'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Strain extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    growths (){
        return this.belongsToMany('App/Models/Growth')
    }
}

module.exports = Strain
