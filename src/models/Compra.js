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
        },
        data_compra: {
          type: Sequelize.DATE,
          defaultValue: Date.now(),
        },
        forma_pagamento: {
          type: Sequelize.ENUM('CARTÃO DE CRÉDITO', 'CARTÃO DE DÉBITO'),
          defaultValue: '',
        },
        endereco_entrega: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        preco_total: {
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

    this.belongsTo(models.Usuario);
  }
}
