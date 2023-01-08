import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'cd_usuario',
        },
        id_endereco: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'tb_enderecos',
            key: 'cd_endereco',
          },
          field: 'cd_endereco',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
              msg: 'Número de telefone inválido',
            },
            len: {
              args: [8, 11],
              msg: 'O número de telefone deve entre 8 e 11 dígitos',
            },
          },
          field: 'nu_fone',
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
          field: 'nu_cpf',
        },
        data_nasc: {
          type: Sequelize.DATEONLY,
          defaultValue: Date.now(),
          validate: {
            customValidator(value) {
              if (new Date(value) < new Date(1900)) {
                throw new Error('Data inválida');
              }
            },
          },
          field: 'dt_nascimento',
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
    this.belongsTo(models.Endereco, { foreignKey: 'cd_endereco' });
  }
}
