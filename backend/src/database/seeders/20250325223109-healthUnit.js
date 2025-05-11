'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HealthUnits', [
      {
        name: "Unidade Centro",
        cep: "80060-000",
        street: "Rua das Flores",
        number: 123,
        city: "Curitiba",
        neighborhood: "Centro",
        state: "Paraná",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: "Unidade Batel",
        cep: "80420-000",
        street: "Rua Marechal Floriano",
        number: 456,
        city: "Curitiba",
        neighborhood: "Batel",
        state: "Paraná",
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: "Unidade Bairro Alto",
        cep: "82000-000",
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
