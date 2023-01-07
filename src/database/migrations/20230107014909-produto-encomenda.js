module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_produto_encomenda', {
      id_produto: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_produtos',
          key: 'cd_produto',
        },
        field: 'cd_produto',
      },
      id_encomenda: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_encomendas',
          key: 'cd_encomenda',
        },
        field: 'cd_encomenda',
      },
      qtd_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'qt_produto',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_produto_encomenda');
  },
};
