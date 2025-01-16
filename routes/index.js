// se requieren la rutas que se utilizaran
const usersRouter = require('./usersRouter');
const authRouter = require('./authRouter');
const todosRouter = require('./todosRouter');
//se requiere express para realizar el ruteo
const express = require('express');

// Se crea una funcion principal la cual realizara la gestion de las rutas
function routerApi(app){
  //Se define el router para utilizar
  const router = express.Router();
  // Esto nos permite gestionar diferentes versiones de apis
  app.use('/api/v1', router);

  // Se especifican las rutas a utilizar
  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/todos', todosRouter);
}

//Se exporta el ruteo de la api
module.exports = routerApi;
