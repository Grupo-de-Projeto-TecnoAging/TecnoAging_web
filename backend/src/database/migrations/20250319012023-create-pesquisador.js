'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pesquisadors', {
      cpf: {
        primaryKey: true, // Definindo cpf como PK
        type: Sequelize.STRING(14),
        allowNull: false,
        references: {
          model: 'Pessoas',  // Nome da tabela Pessoa
          key: 'cpf',        // Chave primária da tabela Pessoa
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      instituicao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      especialidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pesquisadors');
  },
};
