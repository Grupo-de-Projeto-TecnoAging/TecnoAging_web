'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Profissionais', [
    {
      cpf: "33333333333",
      nome: "Cleber Antonio",
      senha: "profissional",
      telefone: "112345678",
      sexo: "M",
      perfil: "profissional",
      email: "profissional1@email.com",
      especialidade: "edFisica"
    },
    {
      cpf: "44444444444",
      nome: "Joane Regina",
      senha: "profissional",
      telefone: "112345678",
      sexo: "F",
      perfil: "profissional",
      email: "profissional2@email.com",
      especialidade: "edFisica"
      }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profissionais', null, {});
  }
};
