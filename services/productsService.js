const { faker } = require('@faker-js/faker');
const pool = require('../libs/postgresPool');
class ProductsService {

  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on('error',(err) => console.error(err));
  }

  async find() {
    const query = "select * from task";
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async create(body){
    const query = `insert into task (title) values ('${body.title}');`;
    const rta = await this.pool.query(query);
  }

}

module.exports = ProductsService;
