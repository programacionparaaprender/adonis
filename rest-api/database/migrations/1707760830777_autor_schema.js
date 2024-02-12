'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutorSchema extends Schema {
  up () {
    this.create('autors', (table) => {
      table.increments();
      table.string('nombre', 100).notNullable();
      table.string('apellido', 100).notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('autors')
  }
}

module.exports = AutorSchema
