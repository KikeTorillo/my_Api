// Ruta que gestiona a los usuarios
const express = require('express');
const router = express.Router();
const TodosService = require('../services/todosService');
const serviceTodos = new TodosService();
const { validatorHandler } = require('./../middleware/validatorHandler');
const { getTodoSchema, createTodoSchema, updateTodoSchema, deleteTodoSchema } = require('./../schemas/toDosSchemas');
const { authenticateJwt, checkRoles } = require('./../middleware/authHandler');


router.get('/:idUser',
    // El cliente tiene constantemente mandarnos el token que se le dio
    // para ser validado 
    authenticateJwt,
    // El middleware checkroles valida si el rol que tiene el usuario del token enviado
    // esta dentro de los permitidos por los parametros enviados esto dependera de la ruta
    checkRoles(['admin', 'user']),
    validatorHandler(getTodoSchema, 'params'),
    async (req, res, next) => {
        //se tienen que aplicar los try catch en cada tipo de peticion para que el middleware lo pueda detectar
        try {
            const { idUser } = req.params;
            const todos = await serviceTodos.findByUser(idUser);
            res.json(todos);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/',
    // El cliente tiene constantemente mandarnos el token que se le dio
    // para ser validado 
    authenticateJwt,
    checkRoles(['admin', 'user']),
    //el validatorHandler es el middleware que valida el eschema vs el body
    validatorHandler(createTodoSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const todos = await serviceTodos.create(body);
            res.json({
                message: 'created',
                data: body
            });
        } catch (error) {
            next(error);
        }
    }
)

router.patch('/',
    authenticateJwt,
    checkRoles(['admin', 'user']),
    //el validatorHandler es el middleware que valida el eschema vs el body
    validatorHandler(updateTodoSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
       const todos = await serviceTodos.update(body);
        res.json({
          message: 'updated',
          data: body
        });
      } catch (error) {
        next(error);
      }
    }
  )

router.delete('/',
    authenticateJwt,
    checkRoles(['admin']),
    validatorHandler(deleteTodoSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const deteTodos = await serviceTodos.delete(body);
        console.log(deteTodos);
        res.json({
          message: 'delete',
          data: body
        });
      } catch (error) {
        next(error);
      }
    }
  )

module.exports = router;
