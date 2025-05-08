'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SensorData', [
      {
        time: "2024-01-01T12:00:00Z",
        id_evaluation: 1,
        accel_x: 0.12,
        accel_y: -0.34,
        accel_z: 9.81,
        gyro_x: 0.01,
        gyro_y: -0.02,
        gyro_z: 0.03,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        time: "2025-01-01T12:00:00Z",
        id_evaluation: 2,
        accel_x: 0.45,
        accel_y: -0.67,
        accel_z: 9.78,
        gyro_x: 0.02,
        gyro_y: -0.03,
        gyro_z: 0.04,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SensorData', null, {});
  }
};
