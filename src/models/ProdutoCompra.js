import Sequelize, { Model } from 'sequelize';

export default class ProdutoCompra extends Model {
  static init(sequelize) {
    super.init(
      {
        id_produto: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'tb_produtos',
            key: 'cd_produto',
          },
          field: 'cd_produto',
        },
        id_compra: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'tb_compras',
            key: 'cd_compra',
          },
          field: 'cd_compra',
        },
        quantidade: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            min: {
              args: [0],
              msg: 'A quantidade deve ser maior ou igual a zero',
            },
          },
          field: 'qt_produto',
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
      { sequelize, tableName: 'tb_produto_compra' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Compra, { foreignKey: 'cd_compra' });
    this.belongsTo(models.Produto, { foreignKey: 'cd_produto' });
  }
}
