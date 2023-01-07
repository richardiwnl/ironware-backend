import Sequelize, { Model } from 'sequelize';

import ProdutoEncomenda from '../models/ProdutoEncomenda'

export default class Encomenda extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'cd_encomenda',
        },
        id_fornecedor: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tb_fornecedores',
            key: 'cd_fornecedor',
          },
          field: 'cd_fornecedor',
        },
        id_auxiliar_adm: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tb_auxiliares_administrativos',
            key: 'cd_auxiliar',
          },
          field: 'cd_auxiliar',
        },
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
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { sequelize, tableName: 'tb_encomendas' }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Produto, {
      foreignKey: 'cd_encomenda',
      otherKey: 'cd_produto',
      through: ProdutoEncomenda,
    });

    this.belongsTo(models.Fornecedor);
    this.belongsTo(models.AuxiliarAdm);
  }
}
