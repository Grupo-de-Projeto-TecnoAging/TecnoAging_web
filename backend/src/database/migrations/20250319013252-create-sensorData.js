'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SensorData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_evaluation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Evaluations',  // name da tabela que referencia
          key: 'id',        // chave primária da tabela referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      accel_x: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      accel_y: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      accel_z: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      gyro_x: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      gyro_y: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      gyro_z: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('SensorData');
  }
};
