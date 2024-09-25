const customersRouter = require('./customersRouter');
const productsRouter = require('./productsRouter');
const express = require('express');
function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/customers', customersRouter);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
