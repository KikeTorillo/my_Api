const express = require('express');
const router = express.Router();
const ProductService = require('../services/productsService');
const serviceProducts = new ProductService();
const { validatorHandler } = require('./../middleware/validatorHandler');
const { createProductSchema, deleteProductSchema } = require('./../schemas/productSchemas');
const { authenticateJwt, checkRoles } = require('./../middleware/authHandler');

router.get('/',
  async (req, res, next) => {
    //se tienen que aplicar los try catch en cada tipo de peticion para que el middleware lo pueda detectar
    try {
      const { id } = req.query;
      let products;
      if (id) {
        products = await serviceProducts.findOne(id);
      }else{
        products = await serviceProducts.find();
      }
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  authenticateJwt,
  checkRoles(['admin']),
  //el validatorHandler es el middleware que valida el eschema vs el body
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const products = await serviceProducts.create(body);
      res.json({
        message: 'created',
        data: body
      });
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      products = await serviceProducts.findOne(id);
      if (products) {
        const body = req.body;
        const products = await serviceProducts.delete(id);
        res.json({
          message: 'deleted',
          data: id
        });
      }
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
