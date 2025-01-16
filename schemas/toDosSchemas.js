// Se requiere la dependencia joi para poder crear schemas para la validacion de los tipos de dato y que sean
// correctos, acorde a la tabla a insertar
const { JSONCookies } = require('cookie-parser');
const Joi = require('joi');

const userId = Joi.number().id();
const toDo = Joi.array().items(Joi.object().keys(
    {
        toDo: Joi.string().required(),
        done: Joi.boolean().required()
    }
));

//Se crea el schema que se validara al momento de crear un usuario
const createTodoSchema = Joi.object({
    userId: userId.required(),
    toDo
});

const getTodoSchema = Joi.object({
    userId: userId.required(),
});

const updateTodoSchema = Joi.object({
    userId: userId.required(),
    toDo: toDo.required()
});

const deleteTodoSchema = Joi.object({
    userId: userId.required()
});

//se exporta el schema para poder utilizarse
module.exports = { createTodoSchema, getTodoSchema, updateTodoSchema, deleteTodoSchema }