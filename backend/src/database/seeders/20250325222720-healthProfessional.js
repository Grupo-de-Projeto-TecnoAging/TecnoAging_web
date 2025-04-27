'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('HealthProfessional', [
    {
      cpf: "33333333333",
      name: "Cleber Antonio",
      password: "healthprofessional",
      phone: "112345678",
      gender: "M",
      profile: "healthprofessional",
      email: "healthprofessional1@email.com",
      expertise: "edFisica"
    },
    {
      cpf: "44444444444",
      name: "Joane Regina",
      password: "healthprofessional",
      phone: "112345678",
      gender: "F",
      profile: "healthprofessional",
      email: "healthprofessional2@email.com",
      expertise: "edFisica"
      }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HealthProfessional', null, {});
  }
};
