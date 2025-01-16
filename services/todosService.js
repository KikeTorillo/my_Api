// Este es el servicio que gestiona la data de los usuarios
const pool = require('../libs/postgresPool');
const boom = require('@hapi/boom');

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

  async createAndUpdate(body) {
    const todo = await this.pool.query(`select * from to_dos where user_id='${body.userId}';`);
    const bodyStringify = JSON.stringify(body.toDo);
    console.log(bodyStringify);
    let query;
    if (todo.rows.length === 0) {
      query = `INSERT INTO public.to_dos(user_id, to_do) VALUES (${body.userId}, '${bodyStringify}');`;
    }else{
      query = `UPDATE public.to_dos SET to_do='${bodyStringify}' WHERE user_id=${body.userId};`;
    }
    const rta = await this.pool.query(query);
    return rta.rows;
  }

}

module.exports = TodosService;