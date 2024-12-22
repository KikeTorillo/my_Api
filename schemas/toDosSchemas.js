// Se requiere la dependencia joi para poder crear schemas para la validacion de los tipos de dato y que sean
// correctos, acorde a la tabla a insertar
const Joi = require('joi');

const id = Joi.number().id();
const idUser = Joi.number().id();
const todo = Joi.string();
const done = Joi.boolean();

//Se crea el schema que se validara al momento de crear un usuario
const createTodoSchema = Joi.object({
    idUser: idUser.required(),
    todo: todo.required(),
    done: done.required(),
});

const getTodoSchema = Joi.object({
    idUser: idUser.required(),
});

const updateTodoSchema = Joi.object({
    idUser: idUser.required(),
    id: id.required(),
    done: done.required()
});

const deleteTodoSchema = Joi.object({
    idUser: idUser.required(),
    id: id.required()
});

//se exporta el schema para poder utilizarse
module.exports  = {createTodoSchema, getTodoSchema, updateTodoSchema, deleteTodoSchema}