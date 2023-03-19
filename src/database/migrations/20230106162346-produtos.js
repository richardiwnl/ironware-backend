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
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_categorias',
          key: 'cd_categoria',
        },
        field: 'cd_categoria',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_nome',
        unique: true,
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
    await queryInterface.dropTable('tb_produtos');
  },
};
