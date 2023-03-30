import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const whitelist = ['http://localhost:3001'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, new Error('Not allowed by CORS'));
    }
  },
};

import test from './src/routes/test';
import Usuario from './src/routes/Usuario';
import Token from './src/routes/Token';
import AuxToken from './src/routes/AuxToken';
import Endereco from './src/routes/Endereco';
import AuxiliarAdm from './src/routes/AuxiliarAdm';
import Compra from './src/routes/Compra';
import Produto from './src/routes/Produto';
import ProdutoCompra from './src/routes/ProdutoCompra';
import Foto from './src/routes/Foto';
import Categoria from './src/routes/Categoria';
import Relatorio from './src/routes/Relatorio';

import './src/database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      })
    );
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname , 'uploads')));
  }

  routes() {
    this.app.use('/', test);
    this.app.use('/usuarios/', Usuario);
    this.app.use('/tokens/', Token);
    this.app.use('/auxtokens/', AuxToken);
    this.app.use('/enderecos/', Endereco);
    this.app.use('/auxiliares/', AuxiliarAdm);
    this.app.use('/compras/', Compra);
    this.app.use('/produtos/', Produto);
    this.app.use('/produtocompra/', ProdutoCompra);
    this.app.use('/fotos/', Foto);
    this.app.use('/categoria/', Categoria);
    this.app.use('/relatorio/', Relatorio);
  }
}

export default new App().app;
