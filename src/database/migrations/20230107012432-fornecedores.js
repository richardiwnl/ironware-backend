module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_fornecedores', {
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
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nu_fone',
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_fornecedores');
  },
};
