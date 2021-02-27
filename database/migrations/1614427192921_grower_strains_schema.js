'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrowerStrainsSchema extends Schema {
  up () {
    this.create('grower_strains', (table) => {
      table.increments()
      table.string('strain_id', 80).notNullable()
      table.string('grower_id', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('grower_strains')
  }
}

module.exports = GrowerStrainsSchema
