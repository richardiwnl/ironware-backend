import Sequelize, { Model } from 'sequelize';

export default class Fornecedor extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O nome precisa ter entre 3 e 255 caracteres',
            },
          },
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
        },
      },
      { sequelize, tableName: 'fornecedores' }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Encomenda, { foreignKey: 'id_fornecedor' });

    this.belongsTo(models.Endereco);
  }
}
