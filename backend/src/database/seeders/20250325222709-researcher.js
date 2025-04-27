'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Researchers', [
    {
      cpf: "55555555555",
      name: 'Raquel de Oliveira',     
      password: "pesquisador",
      phone: "112345678",
      gender: "F",
      profile: "pesquisador",
      email: "pesquisador1@email.com",
      expertise: "Ortopedia",
      institution: "UFPR",
      fieldOfStudy: "Saude"
    },
    {
      cpf: "66666666666",
      name: 'João da Silva',     
      password: "pesquisador",
      phone: "112345678",
      gender: "M",
      profile: "pesquisador",
      email: "pesquisador2@email.com",
      expertise: "Geriatra",
      institution: "UFPR",
      fieldOfStudy: "Saude"
      }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Researchers', null, {});
  }
};
