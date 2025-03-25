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
   await queryInterface.bulkInsert('Pesquisadores', [
    {
      cpf: "55555555555",
      nome: 'Raquel de Oliveira',     
      senha: "pesquisador",
      telefone: "112345678",
      sexo: "F",
      perfil: "pesquisador",
      email: "pesquisador1@email.com",
      especialidade: "Ortopedia",
      instituicao: "UFPR",
      area: "Saude"
    },
    {
      cpf: "66666666666",
      nome: 'João da Silva',     
      senha: "pesquisador",
      telefone: "112345678",
      sexo: "M",
      perfil: "pesquisador",
      email: "pesquisador2@email.com",
      especialidade: "Geriatra",
      instituicao: "UFPR",
      area: "Saude"
      }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pesquisadores', null, {});
  }
};
