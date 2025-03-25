'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Testes', [
    {
      tipo: "TUG",
      cpfProfissional: "33333333333",
      cpfPaciente: "11111111111",
      id_unidade: "1"
    },
    {
      tipo: "TUG",
      cpfProfissional: "44444444444",
      cpfPaciente: "22222222222",
      id_unidade: "2"
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Testes', null, {});
  }
};
