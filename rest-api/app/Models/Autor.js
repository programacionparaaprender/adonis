'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Autor extends Model {
    noticias () {
        return this.hasMany('App/Models/Noticia');
    }
}

module.exports = Autor
