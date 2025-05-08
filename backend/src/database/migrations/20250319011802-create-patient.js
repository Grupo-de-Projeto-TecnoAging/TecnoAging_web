'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      cpf: {
        primaryKey: true, // Definindo cpf como PK
        type: Sequelize.STRING(14),
        allowNull: false,
        references: {
          model: 'People',  // Name da tabela Person
          key: 'cpf',        // Chave primária da tabela Person
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      educationLevel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      socioeconomicStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      downFall: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Patients');
  }
};