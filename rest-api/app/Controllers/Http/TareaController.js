'use strict'
const Proyecto = use('App/Models/Proyecto');
const User = use('App/Models/User')
const Database = use('Database')
const AutorizacionService = use('App/Services/AutorizacionService')
const Tarea = use('App/Models/Tarea');

class TareaController {
    async index({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const { descripcion } = request.all();
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        return await proyecto.tareas().fetch();
    }
    async create({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const { descripcion } = request.all();
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        const tarea = new Tarea();
        tarea.fill({
            descripcion
        });
        await proyecto.tareas().save(tarea);
        return tarea;
    }

    async get({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        //const proyecto = await Proyecto.find(tarea.proyecto_id);
        AutorizacionService.verificarPermiso(proyecto, user);
        return tarea;
    }

    async destroy({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.delete();
        return tarea;
    }
    
    async update({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        
        const proyecto = await tarea.proyecto().fetch();
        console.log(proyecto);
        AutorizacionService.verificarPermiso(proyecto, user);
        tarea.merge(request.only([
            'descripcion',
            'completada'
        ]));
        await tarea.save();
        return tarea;
    }

    async updateNuevo({ request, response, params}){
        const { id } = params;
        const tarea = await Tarea.find(id);
        
        const proyecto = tarea.proyecto().fetch();
        tarea.merge(request.only([
            'descripcion',
            'completada'
        ]));
        await tarea.save();
        return tarea;
    }
}

module.exports = TareaController
