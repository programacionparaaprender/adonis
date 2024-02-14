'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() => {
  Route.post('usuarios/','UserController.index').middleware('auth');
  Route.post('usuarios/registro','UserController.registro');
  Route.post('usuarios/store','UserController.store');
  Route.post('usuarios/login', 'UserController.login');
  Route.post('usuarios/token', 'UserController.token');
  Route.get('proyectos', 'ProyectoController.index').middleware('auth');
  Route.post('proyectos', 'ProyectoController.create').middleware('auth');
  Route.delete('proyectos/:id', 'ProyectoController.destroy').middleware('auth');
  Route.put('proyectos/:id', 'ProyectoController.update').middleware('auth');

  Route.post('proyectos/:id/tareas', 'TareaController.create').middleware('auth');
  Route.get('proyectos/:id/tareas', 'TareaController.index').middleware('auth');
  Route.get('tareas/:id', 'TareaController.get').middleware('auth');
  Route.put('tareas/:id', 'TareaController.update').middleware('auth');
  Route.delete('tareas/:id', 'TareaController.destroy').middleware('auth');
  Route.put('tareas2/:id', 'TareaController.updateNuevo');


  Route.get('autores/', 'AutorController.index').middleware('auth');
  Route.post('autores/', 'AutorController.create').middleware('auth');
  Route.get('autores/:id/noticias', 'AutorController.noticias').middleware('auth');
  Route.delete('autores/:id', 'AutorController.destroy').middleware('auth');
  Route.put('autores/:id', 'AutorController.update').middleware('auth');


  Route.get('tarjetas/', 'TarjetaCreditoController.index');
  Route.post('tarjetas/', 'TarjetaCreditoController.create');
  Route.delete('tarjetas/:id', 'TarjetaCreditoController.destroy');
  Route.put('tarjetas/:id', 'TarjetaCreditoController.update');

  Route.get('menus/', 'MenuController.index').middleware('auth');
  Route.post('menus/', 'MenuController.create').middleware('auth');
  Route.delete('menus/:id', 'MenuController.destroy').middleware('auth');
  Route.put('menus/:id', 'MenuController.update').middleware('auth');

}).prefix('api/v1/');

/* Route.post('/usuarios/registro', () => {
  return { greeting: 'Hola Academia coder registraste un usuario' }
}) */

