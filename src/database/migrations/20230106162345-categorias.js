module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_categorias', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_categoria',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_categoria',
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
    await queryInterface.dropTable('tb_categorias');
  },
};
