module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_produtos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_produto',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_nome',
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_marca',
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'qt_quantidade',
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'vl_valor',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_produtos');
  },
};
