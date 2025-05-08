'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Evaluations', [
      {
        type: "TUG",
        cpfPatient: "111.111.111-01",
        cpfHealthProfessional: "333.333.333-01",
        id_healthUnit: 1,
        date: "2023-10-01",
        totalTime: "00:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "5TSTS",
        cpfPatient: "111.111.111-01",
        cpfHealthProfessional: "333.333.333-01",
        id_healthUnit: 1,
        date: "2023-10-01",
        totalTime: "00:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "TUG",
        cpfPatient: "111.111.111-02",
        cpfHealthProfessional: "333.333.333-02",
        id_healthUnit: 1,
        date: "2023-10-01",
        totalTime: "00:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Evaluation', null, {});
  }
};
