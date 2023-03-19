module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_enderecos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_endereco',
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_logradouro',
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_bairro',
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_cidade',
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'ds_complemento',
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nu_numero',
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nu_cep',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dt_criado_em',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dt_atualizado_em',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_enderecos');
  },
};
