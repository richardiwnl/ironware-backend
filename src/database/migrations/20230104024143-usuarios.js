module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_usuarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        allowNull: false,
        field: 'nm_nome',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'ds_email',
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'nu_fone',
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'nu_cpf',
      },
      data_nasc: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        field: 'dt_nascimento',
      },
      hash_senha: {
        type: Sequelize.STRING,
        allowNull: false,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_usuarios');
  },
};
