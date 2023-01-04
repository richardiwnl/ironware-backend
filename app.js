import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import test from './src/routes/test';

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
  }
}

export default new App().app;
