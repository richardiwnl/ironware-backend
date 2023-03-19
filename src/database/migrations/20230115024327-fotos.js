module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_fotos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'cd_foto',
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tb_produtos',
          key: 'cd_produto',
        },
        field: 'cd_produto',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_nome',
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'nm_arquivo',
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
    await queryInterface.dropTable('tb_fotos');
  },
};
