module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_compras', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_compra',
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tb_usuarios',
          key: 'cd_usuario',
        },
        field: 'cd_usuario',
      },
      data_compra: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'dt_compra',
      },
      forma_pagamento: {
        type: Sequelize.ENUM('CARTÃO DE CRÉDITO', 'CARTÃO DE DÉBITO'),
        allowNull: false,
        field: 'ds_forma_pagamento',
      },
      endereco_entrega: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'ds_endereco_entrega',
      },
      preco_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'vl_precototal',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_compras');
  },
};
