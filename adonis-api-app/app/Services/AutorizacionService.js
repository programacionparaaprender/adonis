const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException')
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException')


class AutorizacionService{
    verificarPermiso(recurso, user){
        if(!recurso){
            throw new RecursoNoEncontradoException();
        }
        if(recurso.user_id !== user.id){
            throw new AccesoProhibidoException();
        }
    }
    async verificarPermiso2(recurso, user){
        if(recurso.user_id !== user.id){
            return true;
        }
        return false;
    }
}

module.exports = new AutorizacionService()