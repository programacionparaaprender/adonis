'use strict'

const TarjetaCredito = use('App/Models/TarjetaCredito');

class TarjetaCreditoController {
    async index({ auth }){
        // solo proyectos del usuario logeado
        const user = await auth.getUser();
        console.log(user);
        return await TarjetaCredito.all();
    }
    
    async create({ auth, request}){
        const user = await auth.getUser();
        /* table.string('titular', 50).notNullable();
        table.string('numero_tarjeta', 16).notNullable();
        table.string('fecha_expiracion', 5).notNullable();
        table.string('cvv', 3).notNullable(); */
        const { titular, numero_tarjeta, fecha_expiracion, cvv } = request.all();
        const tarjetaCredito = await TarjetaCredito.create({
            titular, 
            numero_tarjeta, 
            fecha_expiracion, 
            cvv
          });
        return tarjetaCredito;
    
    }

    async destroy({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const tarjetaCredito = await TarjetaCredito.find(id);
        await tarjetaCredito.delete();
        return tarjetaCredito;
    }
    
    async update({ auth, request, response, params}){
      const user = await auth.getUser();
      const { id } = params;
      const tarjetaCredito = await TarjetaCredito.find(id);
      tarjetaCredito.merge(request.only('titular', 'numero_tarjeta', 'fecha_expiracion', 'cvv'));
      await tarjetaCredito.save();
      return tarjetaCredito;
    }
}

module.exports = TarjetaCreditoController
