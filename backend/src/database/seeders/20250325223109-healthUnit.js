'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HealthUnits', [
      {
        name: "Unidade Centro",
        street: "Rua das Flores",
        number: 123,
        city: "Curitiba",
        neighborhood: "Centro",
        state: "Paraná",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: "Unidade Batel",
        street: "Rua Marechal Floriano",
        number: 456,
        city: "Curitiba",
        neighborhood: "Batel",
        state: "Paraná",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: "Unidade Bairro Alto",
        street: "Rua da Luz",
        number: 789,
        city: "Curitiba",
        neighborhood: "Bairro Alto",
        state: "Paraná",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HealthUnit', null, {});
  }
};
