import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          field: 'cd_usuario',
        },
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          field: 'nm_nome',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O nome precisa ter entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          field: 'ds_email',
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
          field: 'nu_fone',
          unique: {
            msg: 'Número de telefone já cadastrado',
          },
          validate: {
            isNumeric: {
              msg: 'Número de telefone inválido',
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
          field: 'nu_cpf',
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
          defaultValue: Date.now(),
          field: 'dt_nascimento',
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
          field: 'ds_senha',
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
      { sequelize, tableName: 'tb_usuarios' }
    );

    this.addHook('beforeSave', async (user) => {
      if (!user.senha) return;

      user.hash_senha = await bcryptjs.hash(user.senha, 8);
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Compra, { foreignKey: 'cd_usuario' });
    this.belongsTo(models.Endereco);
  }
}
