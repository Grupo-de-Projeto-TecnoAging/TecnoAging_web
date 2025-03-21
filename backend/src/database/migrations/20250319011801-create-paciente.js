'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pacientes', {
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
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      escolaridade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nivel_socio_economico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      altura: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Pacientes');
  }
};