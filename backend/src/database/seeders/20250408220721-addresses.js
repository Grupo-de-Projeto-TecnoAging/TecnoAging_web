'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      {
        address_cep: '12345-678',
        number: 123,
        street: 'Street das Flores',
        complement: 'Apto 101',
        neighborhood: 'Jardim Primavera',
        city: 'São Paulo',
        state: 'SP',
      },
      {
        address_cep: '23456-789',
        number: 456,
        street: 'Avenida Central',
        complement: null,
        neighborhood: 'Centro',
        city: 'Rio de Janeiro',
        state: 'RJ',
      },
      {
        address_cep: '34567-890',
        number: 789,
        street: 'Travessa dos Pássaros',
        complement: 'Casa',
        neighborhood: 'Vila Nova',
        city: 'Belo Horizonte',
        state: 'MG',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Address', null, {});
  }
};
