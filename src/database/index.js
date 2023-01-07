import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database';
import Endereco from '../models/Endereco';
import Compra from '../models/Compra';
import Usuario from '../models/Usuario';
import Produto from '../models/Produto';
import ProdutoCompra from '../models/ProdutoCompra';
import Encomenda from '../models/Encomenda';
import AuxiliarAdm from '../models/AuxiliarAdm';
import Fornecedor from '../models/Fornecedor';

const models = [
  Usuario,
  Endereco,
  Compra,
  Produto,
  ProdutoCompra,
  Encomenda,
  AuxiliarAdm,
  Fornecedor,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
