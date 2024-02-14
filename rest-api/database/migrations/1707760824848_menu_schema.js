'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuSchema extends Schema {
  up () {
    this.create('menus', (table) => {
      table.increments()
      //table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('nombre', 32).notNullable();
      table.string('url', 32).notNullable();
      table.integer('hijo').notNullable();
      table.timestamps();
    });
  }
  down () {
    this.drop('menus')
  }
}

module.exports = MenuSchema
