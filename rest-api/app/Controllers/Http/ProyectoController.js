'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Proyecto = use('App/Models/Proyecto');
const User = use('App/Models/User')
const Database = use('Database')

/**
 * Resourceful controller for interacting with proyectos
 */
class ProyectoController {

  async index({ auth }){
    // solo proyectos del usuario logeado
    const user = await auth.getUser();
    console.log(user);
    return await user.proyectos().fetch();
  }

  async create({ auth, request}){
    const user = await auth.getUser();
    const { nombre } = request.all();
    const proyecto = new Proyecto();
    //proyecto.nombre = nombre;
    proyecto.fill({
        nombre
    });
    await user.proyectos().save(proyecto);
    return proyecto;

  }

  async createMultiple({ auth, request}){
    const user = await auth.getUser();
    const { user_id, nombre } = request.all();
    //const proyecto = new Proyecto();
    //proyecto.nombre = nombre;
    /* proyecto.fill({
        user_id,
        nombre
    }); */
    //await user.proyectos().save(proyecto);
    const proyecto = await Proyecto.create({
      user_id,
        nombre
    });
    await proyecto.save()
    return proyecto;

}

}

module.exports = ProyectoController
