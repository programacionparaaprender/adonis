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
  Route.post('usuarios/registro','UserController.registro');
  Route.post('usuarios/store','UserController.store');
  Route.post('usuarios/login', 'UserController.login');
  Route.get('proyectos', 'ProyectoController.index').middleware('auth');
  Route.post('proyectos', 'ProyectoController.create').middleware('auth');
}).prefix('api/v1/');

/* Route.post('/usuarios/registro', () => {
  return { greeting: 'Hola Academia coder registraste un usuario' }
}) */

