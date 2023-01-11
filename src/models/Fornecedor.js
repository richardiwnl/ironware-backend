import Sequelize, { Model } from 'sequelize';

export default class Fornecedor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'cd_fornecedor',
        },
        id_endereco: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tb_enderecos',
            key: 'cd_endereco',
          },
          field: 'cd_endereco',
        },
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O nome precisa ter entre 3 e 255 caracteres',
            },
          },
          field: 'nm_nome',
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail já cadastrado',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido',
            },
          },
          field: 'ds_email',
        },
        telefone: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Número de telefone já cadastrado',
          },
          validate: {
            isNumeric: {
              msg: 'Número inválido',
            },
            len: {
              args: [8, 11],
              msg: 'O número de telefone deve entre 8 e 11 dígitos',
            },
          },
          field: 'nu_fone',
        },
        cnpj: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [14, 14],
              msg: 'O CNPJ deve ter 14 dígitos',
            },
          },
          field: 'nu_cnpj',
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
      { sequelize, tableName: 'tb_fornecedores' }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Encomenda, { foreignKey: 'cd_fornecedor' });
    this.belongsTo(models.Endereco, { foreignKey: 'cd_endereco' });
  }
}
