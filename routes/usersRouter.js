// Ruta que gestiona a los usuarios
const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');
const serviceUsers = new UsersService();
const { validatorHandler } = require('./../middleware/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/usersSchemas');
const { authenticateJwt, checkRoles } = require('./../middleware/authHandler');


router.get('/',
  // El cliente tiene constantemente mandarnos el token que se le dio
  // para ser validado 
  authenticateJwt,  
  // El middleware checkroles valida si el rol que tiene el usuario del token enviado
  // esta dentro de los permitidos por los parametros enviados esto dependera de la ruta
  checkRoles(['admin','customer','seller']),
  async (req, res, next) => {
    //se tienen que aplicar los try catch en cada tipo de peticion para que el middleware lo pueda detectar
    try {
      const { email } = req.query;
      let users;
      if (email) {
        users = await serviceUsers.findByEmail(email);
      }else{
        users = await serviceUsers.find();
      }
      res.json(users);
    } catch (error) {
      next(error);
    }

  }
)

router.post('/',
  // El cliente tiene constantemente mandarnos el token que se le dio
  // para ser validado 
  authenticateJwt,
  checkRoles(['admin']),
  //el validatorHandler es el middleware que valida el eschema vs el body
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const users = await serviceUsers.create(body);
      res.json({
        message: 'created',
        data: body.email
      });
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  authenticateJwt,
  checkRoles(['admin']),
  //el validatorHandler es el middleware que valida el eschema vs el body
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const users = await serviceUsers.update(id,body);
      res.json({
        message: 'updated',
        data: body
      });
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  authenticateJwt,
  checkRoles(['admin']),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await serviceUsers.delete(id);
      res.json({
        message: 'delete',
        data: id
      });
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
