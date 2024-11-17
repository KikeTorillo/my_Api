// Se requiere la dependencia joi para poder crear schemas para la validacion de los tipos de dato y que sean
// correctos, acorde a la tabla a insertar
const Joi = require('joi');

const id = Joi.number().id();
const price = Joi.string();
const name = Joi.string();

//Se crea el schema que se validara al momento de crear un producto
const createProductSchema = Joi.object({
    name: name.required()
});

//Se crea el schema que se validara al momento de borrar un producto
const deleteProductSchema = Joi.object({
    id: id.required(),
});

//se ecporta el eschema para poder utilizarse
module.exports  = {createProductSchema, deleteProductSchema}