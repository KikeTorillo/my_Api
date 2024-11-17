const { faker } = require('@faker-js/faker');
const pool = require('../libs/postgresPool');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.pool = pool;
    this.pool.on('error',(err) => console.error(err));
  }

  async find() {
    const query = "select * from products;";
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = `select * from products where id=${id};`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async create(body){
    const query = `insert into products (name,price) values ('${body.name}','${body.price}');`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async delete(id){
    const query = `delete from products where id=${id};`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

}

module.exports = ProductsService;
