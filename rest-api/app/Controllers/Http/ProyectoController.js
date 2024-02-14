'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Proyecto = use('App/Models/Proyecto');
const User = use('App/Models/User')
const Database = use('Database')
const AutorizacionService = use('App/Services/AutorizacionService')
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

  async destroy({ auth, request, response, params}){
    const user = await auth.getUser();
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyecto, user);
    /* if(proyecto.user_id !== user.id){
        return response.status(403).json({
            mensaje: "No puedes eliminar un proyecto del cual no eres dueño"
        });
    } */
    await proyecto.delete();
    return proyecto;
}

async update({ auth, request, response, params}){
  const user = await auth.getUser();
  const { id } = params;
  const proyecto = await Proyecto.find(id);
  AutorizacionService.verificarPermiso(proyecto, user);
  proyecto.merge(request.only('nombre'));
  await proyecto.save();
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
