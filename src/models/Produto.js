import Sequelize, { Model } from 'sequelize';

import ProdutoCompra from './ProdutoCompra';

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
          unique: {
            msg: 'Produto já existe',
          },
          validate: {
            len: {
              args: [3, 64],
              msg: 'O nome deve ter entre 3 e 64 caracteres',
            },
          },
          field: 'nm_nome',
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
          field: 'nm_marca',
        },
        quantidade: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            min: {
              args: [1],
              msg: 'A quantidade deve ser maior que 0',
            },
            isNumeric: {
              msg: 'Quantidade do produto inválida',
            },
            isInt: {
              msg: 'A quantidade do produto deve ser um número inteiro',
            },
          },
          field: 'qt_quantidade',
        },
        valor: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0,
          validate: {
            min: {
              args: [1],
              msg: 'O valor deve ser maior que R$ 0,00',
            },
            isNumeric: {
              msg: 'Valor do produto inválido',
            },
            isDecimal: {
              msg: 'O Valor do produto deve ser um número decimal',
            },
          },
          field: 'vl_valor',
        },
        dt_criado_em: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'dt_criado_em',
        },
        dt_atualizado_em: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'dt_atualizado_em',
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

    this.belongsTo(models.Categoria, { foreignKey: 'cd_categoria' });

    this.hasMany(models.Foto, { foreignKey: 'cd_produto' });
  }
}
