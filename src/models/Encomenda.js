import Sequelize, { Model } from 'sequelize';

export default class Encomenda extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_total: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: '',
          validate: {
            isDecimal: {
              msg: 'Valor inválido',
            },
            min: {
              args: [0],
              msg: 'O valor deve ser maior que 0',
            },
            validate: {
              customValidator(value) {
                if (new Date(value) > Date.now()) {
                  return 'Data inválida';
                }
              },
            },
          },
        },
        data_entrega: {
          type: Sequelize.DATE,
          defaultValue: Date.now(),
        },
        data_realizacao: {
          type: Sequelize.DATE,
          defaultValue: Date.now(),
          validate: {
            customValidator(value) {
              if (new Date(value) > Date.now()) {
                return 'Data inválida';
              }
            },
          },
        },
      },
      { sequelize, tableName: 'encomendas' }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      foreignKey: 'id_encomenda',
      otherKey: 'id_produto',
      through: ProdutoEncomenda,
    });

    this.belongsTo(models.Fornecedor);
    this.belongsTo(models.AuxiliarAdm);
  }
}
