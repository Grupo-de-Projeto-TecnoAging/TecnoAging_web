'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Unidades', [
      {
        name: 'Hospital da Unimed',
        endereco: 'Rua das Flores, 123',
      },
      {
        name: 'Hospital do Coração',
        endereco: 'Avenida Brasil, 456',
      },
      {
        name: 'Hospital São Francisco',
        endereco: 'Praça dos Expedicionários, 789',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Unidades', null, {});
  }
};
