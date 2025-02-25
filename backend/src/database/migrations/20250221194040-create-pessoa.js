'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pessoas', {
      cpf: {
        type: Sequelize.STRING(14),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      perfil: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pessoas');
  }
};
