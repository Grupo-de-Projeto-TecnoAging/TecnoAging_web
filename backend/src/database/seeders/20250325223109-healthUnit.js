'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('healthUnits', [
      {
        name: 'Hospital da Unimed',
        address: 'Street das Flores, 123',
      },
      {
        name: 'Hospital do Coração',
        address: 'Avenida Brasil, 456',
      },
      {
        name: 'Hospital São Francisco',
        address: 'Praça dos Expedicionários, 789',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('healthUnit', null, {});
  }
};
