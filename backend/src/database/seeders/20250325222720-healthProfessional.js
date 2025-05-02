'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('HealthProfessionals', [
    {
      cpf: "333.333.333-33",
      name: "Cleber Antonio",
      password: "healthProfessional",
      phone: "112345678",
      gender: "M",
      profile: "healthProfessional",
      email: "healthProfessional1@email.com",
      expertise: "edFisica"
    },
    {
      cpf: "333.333.333-34",
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
