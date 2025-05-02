'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('healthUnits', [
      {
        name: "Unidade Centro",
        street: "Rua das Flores",
        number: 123,
        city: "Curitiba",
        neighborhood: "Centro"
      }, {
        name: "Unidade Batel",
        street: "Rua Marechal Floriano",
        number: 456,
        city: "Curitiba",
        neighborhood: "Batel"
      }, {
        name: "Unidade Bairro Alto",
        street: "Rua da Luz",
        number: 789,
        city: "Curitiba",
        neighborhood: "Bairro Alto"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('healthUnit', null, {});
  }
};
