import Sequelize, { Model } from 'sequelize';

import config from '../config/config';

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'cd_foto',
        },
        id_produto: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'tb_produtos',
            key: 'cd_produto',
          },
          field: 'cd_produto',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          field: 'nm_arquivo',
          validate: {
            notEmpty: {
              msg: 'O campo foto não deve ficar vazio',
            },
          },
        },
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          field: 'nm_nome',
          validate: {
            notEmpty: {
              msg: 'O campo foto não deve ficar vazio',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${config.url}/images/${this.getDataValue('filename')}`;
          },
        },
      },
      { sequelize, tableName: 'tb_fotos' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: 'cd_produto' });
  }
}
