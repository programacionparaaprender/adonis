'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoticiaSchema extends Schema {
  up () {
    this.create('noticias', (table) => {
      table.increments()
      table.string('titulo', 100).notNullable();
      table.string('descripcion', 200).notNullable();
      table.string('contenido', 200).notNullable();
      table.integer('autor_id').unsigned().references('id').inTable('autors');
    });
  }

  down () {
    this.drop('noticias')
  }
}

module.exports = NoticiaSchema
