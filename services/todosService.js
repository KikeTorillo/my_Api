// Este es el servicio que gestiona la data de los usuarios
const pool = require('../libs/postgresPool');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { format } = require("@formkit/tempo");


const generateUuid = () => {
  const date = new Date();
  const formatedDate = format({
    date: date,
    format: "YYYY-MM-DD/HH:mm:ss",
    tz: "America/Mexico_City",
  })

  const complement = Math.random().toString(30).substring(2);
  const uuid = formatedDate + complement;

  return uuid;
}

class TodosService {

  constructor() {
    // Cada servicio tine que tener su propio pool en el contructor
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async findByUser(id) {
    const todo = await this.pool.query(`select * from to_dos where user_id='${id}';`);
    if (todo.rows.length === 0) {
      return todo.rows;
    }
    return todo.rows[0].to_do;
  }

  async createTodo(userId, body) {
    const uuid = generateUuid();
    const todoQuery = await this.pool.query(`select * from to_dos where user_id='${userId}';`);
    let newtoDos;
    let toDoStringify;
    let query;
    let newToDo;
    newToDo = body.toDo;
    newToDo.id = uuid
    if (todoQuery.rows.length === 0) {
      newtoDos = [];
      newtoDos.push(newToDo);
      toDoStringify = JSON.stringify(newtoDos);
      query = `INSERT INTO public.to_dos(user_id, to_do) VALUES (${userId}, '${toDoStringify}');`;
    } else {
      newtoDos = [...todoQuery.rows[0].to_do];
      newtoDos.push(newToDo);
      toDoStringify = JSON.stringify(newtoDos);
      query = `UPDATE public.to_dos SET to_do='${toDoStringify}' WHERE user_id=${userId};`;
    }
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async updateTodo(userId, body) {
    const todoQuery = await this.pool.query(`select * from to_dos where user_id='${userId}';`);
    let newtoDos;
    let toDoStringify;
    let query;
    let newToDo;
    newToDo = body.toDo;

    if (todoQuery.rows.length !== 0) {
      newtoDos = [...todoQuery.rows[0].to_do];
      const todoIndex = newtoDos.findIndex((todo) => {
        return todo.id == newToDo.id;
      });
      newtoDos[todoIndex].done = !newtoDos[todoIndex].done;
      toDoStringify = JSON.stringify(newtoDos);
      query = `UPDATE public.to_dos SET to_do='${toDoStringify}' WHERE user_id=${userId};`;
      const rta = await this.pool.query(query);
      return rta.rows;
    }
  }

  async deleteTodo(userId, body) {
    const todoQuery = await this.pool.query(`select * from to_dos where user_id='${userId}';`);
    let newtoDos;
    let toDoStringify;
    let query;
    let newToDo;
    newToDo = body.toDo;

    if (todoQuery.rows.length !== 0) {
      newtoDos = [...todoQuery.rows[0].to_do];
      const todoIndex = newtoDos.findIndex((todo) => {
        return todo.id == newToDo.id;
      });
      newtoDos.splice(todoIndex, 1);
      toDoStringify = JSON.stringify(newtoDos);
      query = `UPDATE public.to_dos SET to_do='${toDoStringify}' WHERE user_id=${userId};`;
      const rta = await this.pool.query(query);
      return rta.rows;
    }
  }

  async updateOrderTodo(userId, body) {
    const bodyStringify = JSON.stringify(body.toDo);
    let query;
    query = `UPDATE public.to_dos SET to_do='${bodyStringify}' WHERE user_id=${userId};`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

}

module.exports = TodosService;