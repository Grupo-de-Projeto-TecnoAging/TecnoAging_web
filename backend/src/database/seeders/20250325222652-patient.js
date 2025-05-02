'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Patients', [
    {
      cpf: "111.111.111-11",
      name: "Claudio da Silva",
      password: "patient",
      phone: "112345678",
      gender: "M",
      profile: "patient",
      adress: "adress",
      datOfBirth: "1955-01-01",
      educationStatus: "Superior Completo",
      socioeconomicLevel: "Medio",
      weight: "70.0",
      height: "1.80",
      age: "86",
      downFall: false
    },
    {
      cpf: "111.111.111-12",
      name: "Maria da Silva",
      password: "patient",
      phone: "112345678",
      gender: "F",
      profile: "patient",
      adress: "Address",
      datOfBirth: "1955-04-12",
      educationStatus: "Superior Completo",
      socioeconomicLevel: "Medio",
      weight: "70.0",
      height: "1.57",
      age: "76",
      downFall: true
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patient', null, {});
  }
};
