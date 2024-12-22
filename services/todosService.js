// Este es el servicio que gestiona la data de los usuarios
const pool = require('../libs/postgresPool');
const boom = require('@hapi/boom');
const { updateTable } = require('../utils/sql/updateAbtraction');

class TodosService {

  constructor() {
    // Cada servicio tine que tener su propio pool en el contructor
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async findByUser(id) {
    const todo = await this.pool.query(`select * from to_dos where id_user='${id}';`);
    if (!todo) {
      throw boom.notFound('user not found');
    }
    return todo.rows;
  }

  async create(body) {
    const query = `INSERT INTO public.to_dos(id_user, to_do, done) VALUES (${body.idUser}, '${body.todo}', false);`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(body) {
    const query = `UPDATE public.to_dos SET done=${body.done} WHERE id_user=${body.idUser} and id=${body.id};`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async delete(body) {
    const query = `DELETE FROM public.to_dos WHERE id_user=${body.idUser} and id=${body.id};`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }


}

module.exports = TodosService;