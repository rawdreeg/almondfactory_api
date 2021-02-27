'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrowthSchema extends Schema {
  up () {
    this.create('growths', (table) => {
      table.increments()
      table.string('strain_id', 80).notNullable().unique()
      table.string('grower_id', 80).notNullable()
      table.string('user_id', 80).notNullable()
      table.text('notes').notNullable()
      table.string('status', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('growths')
  }
}

module.exports = GrowthSchema
