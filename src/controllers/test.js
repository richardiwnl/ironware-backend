import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database';

const connection = new Sequelize(databaseConfig);

class TestController {
  async index(req, res) {
    try {
      await connection.authenticate();
      res.send('<h1> Sucesso! </h1>');
    } catch (err) {
      res.send(`<h1> Erro! ${err} </h1>`);
    }
  }
}

export default new TestController();
