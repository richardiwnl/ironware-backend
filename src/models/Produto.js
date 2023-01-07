import Sequelize, { Model } from 'sequelize';

import ProdutoCompra from './ProdutoCompra';
import ProdutoEncomenda from './ProdutoEncomenda';

export default class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'cd_produto',
        },
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
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { sequelize, tableName: 'tb_produtos' }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Compra, {
      foreignKey: 'cd_produto',
      otherKey: 'cd_compra',
      through: ProdutoCompra,
    });

    this.belongsToMany(models.Encomenda, {
      foreignKey: 'cd_produto',
      otherKey: 'cd_encomenda',
      through: ProdutoEncomenda,
    });
  }
}
