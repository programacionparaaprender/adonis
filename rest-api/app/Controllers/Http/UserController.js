'use strict'

const User = use('App/Models/User');
const Database = use('Database')

class UserController {
    async login({ request, auth }) {
        const { username, email, password } = request.all();
        const token = await auth.attempt(email, password);
        //await auth.attempt(uid, password)
        return {
            type: token.type,
            token: token.token,
            refreshToken: token.refreshToken,
            status: 200,
            mensaje: "Token obtenido"
        };
    }
    async registro ({ request, response }) {
        const { username, email, password } = request.all();
        const user = await User.create({
          username, 
          email, 
          password
        });
        await user.save()
        return {
            user: user,
            status: 201,
            mensaje: "Creamos un usuario desde el Controlador"
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
}

module.exports = UserController
