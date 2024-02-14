'use strict'

const Menu = use('App/Models/Menu');

class MenuController {
    async index({ auth }){
        // solo proyectos del usuario logeado
        const user = await auth.getUser();
        console.log(user);
        return await Menu.all();
    }
    
    async create({ auth, request}){
        const user = await auth.getUser();
        /* table.string('nombre', 32).notNullable();
      table.string('url', 32).notNullable();
      table.integer('hijo').notNullable();*/
        const { nombre, url, hijo } = request.all();
        const menu = await Menu.create({
            nombre, 
            url, 
            hijo
          });
        return menu;
    
    }

    async destroy({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const menu = await Menu.find(id);
        await menu.delete();
        return menu;
    }
    
    async update({ auth, request, response, params}){
      const user = await auth.getUser();
      const { id } = params;
      const menu = await Menu.find(id);
      menu.merge(request.only('nombre', 'url', 'hijo'));
      await menu.save();
      return menu;
    }
}

module.exports = MenuController
