'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StrainsSchema extends Schema {
  up () {
    this.create('strains', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('type', 80)
      table.string('effect', 200)
      table.string('flavor', 200)
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('strains')
  }
}

module.exports = StrainsSchema
