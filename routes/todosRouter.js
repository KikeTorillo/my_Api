// Ruta que gestiona a los usuarios
const express = require('express');
const router = express.Router();
const TodosService = require('../services/todosService');
const serviceTodos = new TodosService();
const { validatorHandler } = require('./../middleware/validatorHandler');
const { getTodoSchema, createTodoSchema, updateTodoSchema, updateOrderTodoSchema } = require('./../schemas/toDosSchemas');
const { authenticateJwt, checkRoles } = require('./../middleware/authHandler');


router.get('/:userId',
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
            const { userId } = req.params;
            const todos = await serviceTodos.findByUser(userId);
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
            const userId = req.user.sub;
            const body = req.body;
            const toDos = await serviceTodos.createTodo(userId, body);
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
    validatorHandler(updateTodoSchema, 'body'),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = req.body;
            const toDos = await serviceTodos.updateTodo(userId, body);
            res.json({
                message: 'updated',
                data: body
            });
        } catch (error) {
            next(error);
        }
    }
)

router.put('/',
    authenticateJwt,
    checkRoles(['admin', 'user']),
    validatorHandler(updateOrderTodoSchema, 'body'),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = req.body;
            const toDos = await serviceTodos.updateOrderTodo(userId, body);
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
    checkRoles(['admin', 'user']),
    validatorHandler(updateTodoSchema, 'body'),
    async (req, res, next) => {
        try {
            const userId = req.user.sub;
            const body = req.body;
            const toDos = await serviceTodos.deleteTodo(userId, body);
            res.json({
                message: 'deleted',
                data: body
            });
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;
