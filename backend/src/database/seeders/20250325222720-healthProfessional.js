'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('HealthProfessionals', [
    {
      cpf: "33333333333",
      name: "Cleber Antonio",
      password: "healthProfessional",
      phone: "112345678",
      gender: "M",
      profile: "healthProfessional",
      email: "healthProfessional1@email.com",
      expertise: "edFisica"
    },
    {
      cpf: "44444444444",
      name: "Joane Regina",
      password: "healthProfessional",
      phone: "112345678",
      gender: "F",
      profile: "healthProfessional",
      email: "healthProfessional2@email.com",
      expertise: "edFisica"
      }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HealthProfessional', null, {});
  }
};
