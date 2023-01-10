import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import test from './src/routes/test';
import Usuario from './src/routes/Usuario';
import Token from './src/routes/Token';

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
  }
}

export default new App().app;
