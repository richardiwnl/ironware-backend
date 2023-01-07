module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_encomendas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_encomenda',
      },
      id_fornecedor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_fornecedores',
          key: 'cd_fornecedor',
        },
        field: 'cd_fornecedor',
      },
      id_auxiliar_adm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_auxiliares_administrativos',
          key: 'cd_auxiliar',
        },
        field: 'cd_auxiliar',
      },
      preco_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'vl_preco_total',
      },
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dt_entrega',
      },
      data_realizacao: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dt_realizacao',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_encomendas');
  },
};
