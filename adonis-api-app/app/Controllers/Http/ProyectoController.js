'use strict'
const Proyecto = use('App/Models/Proyecto');
const User = use('App/Models/User')
const Database = use('Database')
const AutorizacionService = use('App/Services/AutorizacionService')


class ProyectoController {
    async index({ auth }){
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

    async obtenerProyectos({ request}){
        //const user = await auth.getUser();
        const { id } = request.all();
        const user = await User.find(id);
        console.log(user);
        return await user.proyectos().fetch();


    }

    async createProyecto({ request}){
        //const user = await auth.getUser();
        const { id, nombre } = request.all();
        //const user = await User.find(id);
        //console.log('usuario: ' + user);
        /* const proyecto = new Proyecto();
        proyecto.nombre = nombre;
        proyecto.fill({
            nombre
        }); */
        /* 
        await user.proyectos.save(proyecto);
        console.log('proyecto: ' + proyecto);
        return proyecto; */
        /* const user_id = id;
        const proyecto = await Proyecto.create({
            user_id, 
            nombre
          });
          await proyecto.save()
          return proyecto; */
          const proyecto = await Database.raw('spInsertarProyectos @user_id=?,@nombre=?', [id, nombre]);
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
            proyecto.delete();
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

    /*
    create procedure dbo.spInsertarActualizarProyectos
@id int,
@nombre nvarchar(80)
    */
}

module.exports = ProyectoController
