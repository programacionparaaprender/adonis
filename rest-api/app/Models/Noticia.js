'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Noticia extends Model {
    autor () {
        return this.belongsTo('App/Models/Autor')
    }
}

module.exports = Noticia
