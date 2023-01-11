module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_auxiliares_administrativos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_auxiliar',
      },
      id_endereco: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tb_enderecos',
          key: 'cd_endereco',
        },
        field: 'cd_endereco',
        onDelete: 'SET NULL',
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
        field: 'ds_email',
      },
      data_nasc: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dt_nascimento',
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nu_cpf',
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nu_fone',
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
    await queryInterface.dropTable('tb_auxiliares_administrativos');
  },
};
