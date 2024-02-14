'use strict'

const Autor = use('App/Models/Autor');
const Noticia = use('App/Models/Noticia');

class NoticiaController {
    async index({ auth }){
        // solo proyectos del usuario logeado
        const user = await auth.getUser();
        console.log(user);
        return await Noticia.all();
    }
    
    async create({ auth, request}){
        /* table.string('titulo', 100).notNullable();
      table.string('descripcion', 200).notNullable();
      table.string('contenido', 200).notNullable();
      table.integer('autor_id').unsigned().references('id').inTable('autors'); */
        const user = await auth.getUser();
        const { descripcion, contenido, autor_id } = request.all();
        const noticia = await Noticia.create({
            descripcion, 
            contenido,
            autor_id
          });
        return noticia;
    }
    
    async destroy({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const noticia = await Noticia.find(id);
        await noticia.delete();
        return noticia;
    }
    
    async update({ auth, request, response, params}){
      const user = await auth.getUser();
      const { id } = params;
      const noticia = await Noticia.find(id);
      noticia.merge(request.only('descripcion', 'contenido', 'autor_id'));
      await noticia.save();
      return autor;
    }
}

module.exports = NoticiaController
