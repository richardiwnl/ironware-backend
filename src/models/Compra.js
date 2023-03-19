import Sequelize, { Model } from 'sequelize';

import ProdutoCompra from './ProdutoCompra';

export default class Compra extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          field: 'cd_compra',
        },
        id_usuario: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'tb_usuarios',
            key: 'cd_usuario',
          },
          field: 'cd_usuario',
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O usuário deve ser informado',
            },
          },
        },
        data_compra: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
          field: 'dt_compra',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'A data da compra deve ser informada',
            },
            customValidator(value) {
              if (new Date(value) > Date.now()) {
                throw new Error('Data inválida');
              }
            },
          },
        },
        forma_pagamento: {
          type: Sequelize.ENUM('CARTÃO DE CRÉDITO', 'CARTÃO DE DÉBITO'),
          field: 'ds_forma_pagamento',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'A forma de pagamento deve ser informada',
            },
            is: {
              args: /^(CARTÃO DE CRÉDITO|CARTÃO DE DÉBITO)$/,
              msg: 'Forma de pagamento inválida',
            },
          },
        },
        endereco_entrega: {
          type: Sequelize.STRING,
          defaultValue: '',
          field: 'ds_endereco_entrega',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O endereço de entrega deve ser informado',
            },
          },
        },
        preco_total: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0,
          field: 'vl_precototal', // TODO: Migrar o db com o nome certo
          allowNull: false,
          validate: {
            isFloat: {
              msg: 'O preço total deve ser um número inteiro ou decimal',
            },
            min: {
              args: [1],
              msg: 'O preço total deve ser maior que 0',
            },
          },
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
      {
        sequelize,
        tableName: 'tb_compras',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      foreignKey: 'cd_compra',
      otherKey: 'cd_produto',
      through: ProdutoCompra,
    });

    this.belongsTo(models.Usuario, { foreignKey: 'cd_usuario' });
  }
}
