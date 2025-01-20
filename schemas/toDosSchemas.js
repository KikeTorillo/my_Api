// Se requiere la dependencia joi para poder crear schemas para la validacion de los tipos de dato y que sean
// correctos, acorde a la tabla a insertar
const Joi = require('joi');

const userId = Joi.number().id();

//const toDo = Joi.array().items(Joi.object().keys(
//    {
//        toDo: Joi.string().required(),
//        done: Joi.boolean().required()
//    }
//));

const getTodoSchema = Joi.object({
    userId: userId.required(),
});

//Se crea el schema que se validara al momento de crear un toDo
//const createUpdateDeleteTodoSchema = Joi.object({
//    userId: userId.required(),
//    toDo
//});

const createTodoSchema = Joi.object({
    toDo: Joi.object().keys(
        {
            toDo: Joi.string().required(),
            done: Joi.boolean().required()
        }
    )
});

const updateTodoSchema = Joi.object({
    toDo: Joi.object().keys(
        {
            id: Joi.string().required(),
            toDo: Joi.string().required(),
            done: Joi.boolean().required()
        }
    )
});

const updateOrderTodoSchema = Joi.object({
    toDo: Joi.array().items(Joi.object().keys(
        {
            id: Joi.string().required(),
            toDo: Joi.string().required(),
            done: Joi.boolean().required()
        }
    ))
});


//se exporta el schema para poder utilizarse
module.exports = { createTodoSchema, updateTodoSchema, getTodoSchema, updateOrderTodoSchema }