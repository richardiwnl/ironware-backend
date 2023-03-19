import Sequelize, { Model } from 'sequelize';

export default class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'cd_categoria',
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'nm_categoria',
          validate: {
            notEmpty: {
              msg: 'A categoria deve ser informada',
            },
            len: {
              args: [3, 30],
              msg: 'A categoria deve ter entre 3 e 30 caracteres',
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
      { sequelize, tableName: 'tb_categorias' }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Produto, { foreignKey: 'cd_categoria' });
  }
}
