'use strict'
const Autor = use('App/Models/Autor');

class AutorController {
    async index({ auth }){
        // solo proyectos del usuario logeado
        const user = await auth.getUser();
        console.log(user);
        return await Autor.all();
    }
    
    async create({ auth, request}){
        const user = await auth.getUser();
        const { nombre, apellido } = request.all();
        const autor = await Autor.create({
            nombre, 
            apellido
          });
        return autor;
    
    }

    async noticias({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const autor = await Autor.find(id);
        const noticias = await autor.noticias().fetch();
        return noticias;
    }
    
    async destroy({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const autor = await Autor.find(id);
        await autor.delete();
        return autor;
    }
    
    async update({ auth, request, response, params}){
      const user = await auth.getUser();
      const { id } = params;
      const autor = await Autor.find(id);
      autor.merge(request.only('nombre', 'apellido'));
      await autor.save();
      return autor;
    }
    
}

module.exports = AutorController
