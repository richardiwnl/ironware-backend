import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
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
        cpf: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'CPF já cadastrado',
          },
          validate: {
            len: {
              args: [11, 11],
              msg: 'O CPF deve ter 11 dígitos',
            },
          },
        },
        dataNasc: {
          type: Sequelize.DATE,
          defaultValue: '',
          validate: {
            customValidator(value) {
              if (new Date(value) < new Date(1900)) {
                throw new Error('Data inválida');
              }
            },
          },
        },
        senha: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [8, 32],
              msg: 'A senha deve ter entre 8 e 32 caracteres',
            },
          },
        },
        hash_senha: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
      },
      { sequelize, tableName: 'usuarios' }
    );

    this.addHook('beforeSave', async (user) => {
      user.hash_senha = await bcryptjs.hash(user.senha, 8);
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Compra, { foreignKey: 'id_usuario', });
    this.belongsTo(models.Endereco);
  }
}
