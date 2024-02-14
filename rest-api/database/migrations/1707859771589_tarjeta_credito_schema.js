'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TarjetaCreditoSchema extends Schema {
  up () {
    this.create('tarjeta_creditos', (table) => {
      table.increments();
      table.string('titular', 50).notNullable();
      table.string('numero_tarjeta', 16).notNullable();
      table.string('fecha_expiracion', 5).notNullable();
      table.string('cvv', 3).notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('tarjeta_creditos')
  }
}

module.exports = TarjetaCreditoSchema
