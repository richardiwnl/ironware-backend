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
        id_encomenda: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'tb_encomendas',
            key: 'cd_encomenda',
          },
          field: 'cd_encomenda',
        },
        qt_produto: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            min: {
              args: [0],
              msg: 'A quantidade deve ser maior ou igual a zero',
            },
          },
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
      { sequelize, tableName: 'tb_produto_encomenda' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Encomenda, { foreignKey: 'cd_encomenda' });
    this.belongsTo(models.Produto, { foreignKey: 'cd_produto' });
  }
}
