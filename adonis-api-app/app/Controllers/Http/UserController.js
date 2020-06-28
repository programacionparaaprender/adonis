'use strict'

const User = use('App/Models/User');
const Database = use('Database')

class UserController {
   
  async login({ request, auth }) {
    const { username, email, password } = request.all();
    const token = await auth.attempt(email, password);
    //await auth.attempt(uid, password)
    return token;
}
  
  /**
   * Create/save a new ejemplo.
   * POST ejemplos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

/*
alter procedure dbo.spInsertarActualizarUsuarios
@id int,
@username nvarchar(80),
@email nvarchar(254),
@password nvarchar(60)

*/
async InsertarActualizarUsuarios ({ request, response }) {
  const { id, username, email, password } = request.all();
  await Database.raw('Exec spInsertarActualizarUsuarios @id=?, @username=?, @email=?, @password?', [id, username, email, password]);

  return{
      mensaje: 'actualizamos un usuario'
  } 
}

  async registro ({ request, response }) {
    const { username, email, password } = request.all();
    const user = await User.create({
      username, 
      email, 
      password
    });
    await user.save()
    return{
        mensaje: 'creamos un usuario'
    } 
}
  async store ({ request, response }) {
      const { username, email, password } = request.all();
      const user = await User.create({
        username, 
        email, 
        password
      });
      return this.login(... arguments);
      /* await user.save()
      return{
          mensaje: 'creamos un usuario'
      } */
}
async show ({ params, request, response, view }) {
  //const users = await User.all();
  //const users = yield Database.from('users'); //.where('id', 1);
  //const users = await Database.select('*').from('users')
  const users = await Database.raw('Exec spMostrarUsuarios @usuario=?', [0]);
  return{
    users: users
  }
}
}

module.exports = UserController
