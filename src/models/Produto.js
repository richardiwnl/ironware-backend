import Sequelize, { Model } from 'sequelize';

import ProdutoCompra from './ProdutoCompra';
import ProdutoEncomenda from './ProdutoEncomenda';

export default class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 64],
              msg: 'O nome deve ter entre 3 e 64 caracteres',
            },
            isNumeric: {
              msg: 'O nome não deve conter números',
            },
          },
        },
        marca: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [2, 30],
              msg: 'A marca deve ter entre 2 e 30 caracteres',
            },
          },
        },
        quantidade: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            min: {
              args: [1],
              msg: 'A quantidade deve ser maior que 0',
            },
          },
        },
        valor: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0,
        },
      },
      { sequelize, tableName: 'produtos' }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Compra, {
      foreignKey: 'id_produto',
      otherKey: 'id_compra',
      through: ProdutoCompra,
    });

    this.belongsToMany(models.Encomenda, {
      foreignKey: 'id_produto',
      otherKey: 'id_encomenda',
      through: ProdutoEncomenda,
    });
  }
}
