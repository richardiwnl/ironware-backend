import Sequelize, { Model } from 'sequelize';

export default class ProdutoCompra extends Model {
  static init(sequelize) {
    super.init(
      {
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
      },
      { sequelize, tableName: 'produto_compra' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Compra, { foreignKey: 'id_compra' });
    this.belongsTo(models.Produto, { foreignKey: 'id_produto' });
  }
}
