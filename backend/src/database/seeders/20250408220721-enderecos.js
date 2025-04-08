'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Enderecos', [
      {
        endereco_cep: '12345-678',
        numero: 123,
        rua: 'Rua das Flores',
        complemento: 'Apto 101',
        bairro: 'Jardim Primavera',
        cidade: 'São Paulo',
        estado: 'SP',
      },
      {
        endereco_cep: '23456-789',
        numero: 456,
        rua: 'Avenida Central',
        complemento: null,
        bairro: 'Centro',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
      },
      {
        endereco_cep: '34567-890',
        numero: 789,
        rua: 'Travessa dos Pássaros',
        complemento: 'Casa',
        bairro: 'Vila Nova',
        cidade: 'Belo Horizonte',
        estado: 'MG',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enderecos', null, {});
  }
};
