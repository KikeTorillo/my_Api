// Ruta de autenticacion en donde se valida la 
// estrategia local de autenticacion con passport
const express = require('express');
const passport = require('passport');
const AuthService = require('./../services/authService');
const service = new AuthService;
const { validatorHandler } = require('./../middleware/validatorHandler');
const { loginSchema, changePasswordSchema, registrationSchema } = require('./../schemas/usersSchemas');
const router = express.Router();

router.post('/login',
  // se coloca el manejo de sesiones de passport en false
  // esto por que las sesiones se getionan con JWT
  passport.authenticate('local', { session: false }),
  
  validatorHandler(loginSchema, 'body'),
  async (req, res, next) => {
    // res.header('Acces-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS')
    // res.header('Access-Control-Allow-Headers', '*')

    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
)

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecoveryLink(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/registration',
  validatorHandler(registrationSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      body.role = 'user'
      const rta = await service.regiterUser(body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;