import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database';
import Endereco from '../models/Endereco';
import Compra from '../models/Compra';
import Usuario from '../models/Usuario';
import Produto from '../models/Produto';
import ProdutoCompra from '../models/ProdutoCompra';
import Administrador from '../models/Administrador';
import Foto from '../models/Foto';
import Categoria from '../models/Categoria';

const models = [
  Endereco,
  Usuario,
  Compra,
  Produto,
  ProdutoCompra,
  Administrador,
  Foto,
  Categoria,
];

const connection = new Sequelize(databaseConfig);

const reset = async () => {
  await connection.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
    connection.sync({ force: true });
  });
};

// reset();

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
