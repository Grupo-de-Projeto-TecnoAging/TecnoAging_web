'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Evaluation', [
    {
      type: "TUG",
      cpfHealthProfessional: "33333333333",
      cpfPatient: "11111111111",
      id_healthUnit: "1"
    },
    {
      type: "TUG",
      cpfHealthProfessional: "44444444444",
      cpfPatient: "22222222222",
      id_healthUnit: "2"
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Evaluation', null, {});
  }
};
