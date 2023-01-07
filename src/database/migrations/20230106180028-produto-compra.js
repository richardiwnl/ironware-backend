module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_produto_compra', {
      id_produto: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_produtos',
          key: 'cd_produto',
        },
        field: 'cd_produto',
      },
      id_compra: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_compras',
          key: 'cd_compra',
        },
        field: 'cd_compra',
      },
      qtd_produto: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'qt_produto',
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
    await queryInterface.dropTable('tb_produto_compra');
  },
};
