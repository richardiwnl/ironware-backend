import Sequelize, { Model } from 'sequelize';

import ProdutoCompra from './ProdutoCompra';

export default class Compra extends Model {
  static init(sequelize) {
    super.init(
      {
        data_compra: {
          type: Sequelize.DATE,
          defaultValue: '',
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
      },
      {
        sequelize,
        tableName: 'compras',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      foreignKey: 'id_compra',
      otherKey: 'id_produto',
      through: ProdutoCompra,
    });

    this.belongsTo(models.Usuario);
  }
}
