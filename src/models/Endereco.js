import Sequelize, { Model } from 'sequelize';

export default class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'cd_endereco',
        },
        logradouro: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O logradouro deve ter entre 3 e 255 caracteres',
            },
          },
        },
        bairro: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O bairro deve ter entre 3 e 255 caracteres',
            },
          },
        },
        cidade: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'A cidade deve ter entre 3 e 255 caracteres',
            },
          },
        },
        complemento: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O complemento deve ter entre 3 e 255 caracteres',
            },
          },
        },
        numero: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'O número deve ser um valor inteiro',
            },
            len: {
              args: [1, 5],
              msg: 'O número deve ter entre 1 e 5 dígitos',
            },
          },
        },
        cep: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'O CEP deve ser um número inteiro',
            },
            len: {
              args: [8, 8],
              msg: 'O CEP deve ter 8 dígitos',
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
      {
        sequelize,
        tableName: 'tb_enderecos',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Usuario, { foreignKey: 'cd_endereco' });
    this.hasOne(models.Fornecedor, { foreignKey: 'cd_endereco' });
    this.hasOne(models.AuxiliarAdm, { foreignKey: 'cd_endereco' });
  }
}
