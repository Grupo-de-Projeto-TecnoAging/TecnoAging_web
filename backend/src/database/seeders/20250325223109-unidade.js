'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Unidades', [
      {
        nome: 'Hospital da Unimed',
        endereco: 'Rua das Flores, 123',
      },
      {
        nome: 'Hospital do Coração',
        endereco: 'Avenida Brasil, 456',
      },
      {
        nome: 'Hospital São Francisco',
        endereco: 'Praça dos Expedicionários, 789',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Unidades', null, {});
  }
};
