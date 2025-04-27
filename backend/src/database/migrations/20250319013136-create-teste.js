'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evaluation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tipo: {
        type: Sequelize.ENUM('5TSTS', 'TUG'),
        allowNull: false,
      },
      cpfHealthProfessional: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'HealthProfessionals',  // name da tabela que referencia
          key: 'cpf',              // chave primária da tabela referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cpfPatient: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Patients',
          key: 'cpf',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_unidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Unidades',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Evaluation');
  }
};
