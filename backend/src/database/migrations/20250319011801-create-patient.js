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
          model: 'Pessoas',  // Nome da tabela Pessoa
          key: 'cpf',        // Chave primária da tabela Pessoa
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_endereco: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Enderecos',  // nome da tabela que referencia
          key: 'endereco_cep', // chave primária da tabela referenciada
        },
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
    await queryInterface.dropTable('Pacientes');
  }
};