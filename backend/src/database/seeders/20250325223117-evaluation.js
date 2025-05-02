'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Evaluations', [
      {
        type: "TUG",
        cpfPatient: "111.111.111-11",
        cpfHealthProfessional: "333.333.333-33",
        id_healthUnit: 1,
        date: "2023-10-01",
        totalTime: "00:30:00"
      },
      {
        type: "5TSTS",
        cpfPatient: "111.111.111-11",
        cpfHealthProfessional: "333.333.333-33",
        id_healthUnit: 1,
        date: "2023-10-01",
        totalTime: "00:30:00"
      },
      {
        type: "TUG",
        cpfPatient: "111.111.111-12",
        cpfHealthProfessional: "333.333.333-34",
        id_healthUnit: 1,
        date: "2023-10-01",
        totalTime: "00:30:00"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Evaluation', null, {});
  }
};
