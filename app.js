import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import test from './src/routes/test';
import Usuario from './src/routes/Usuario';
import Token from './src/routes/Token';
import AuxToken from './src/routes/AuxToken';
import Endereco from './src/routes/Endereco';
import AuxiliarAdm from './src/routes/AuxiliarAdm';
import Fornecedor from './src/routes/Fornecedor';
import Encomenda from './src/routes/Encomenda';

import './src/database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', test);
    this.app.use('/usuarios/', Usuario);
    this.app.use('/tokens/', Token);
    this.app.use('/auxtokens/', AuxToken);
    this.app.use('/enderecos/', Endereco);
    this.app.use('/auxiliares/', AuxiliarAdm);
    this.app.use('/fornecedores/', Fornecedor);
    this.app.use('/encomendas/', Encomenda);
  }
}

export default new App().app;
