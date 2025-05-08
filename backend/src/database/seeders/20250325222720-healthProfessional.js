'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const healthProfessionals = [
      {
        cpf: "333.333.333-01",
        person: {
          name: "Cleber Antonio",
          password: "healthProfessional",
          phone: "112345678",
          gender: "M",
          profile: "healthProfessional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        healthProfessional: {
          email: "healthProfessional1@email.com",
          expertise: "edFisica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        cpf: "333.333.333-02",
        person: {
          name: "Joane Regina",
          password: "healthProfessional",
          phone: "112345678",
          gender: "F",
          profile: "healthProfessional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        healthProfessional: {
          email: "healthProfessional2@email.com",
          expertise: "edFisica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ];

    // Inserir dados na tabela People
    for (const professional of healthProfessionals) {
      await queryInterface.bulkInsert('People', [
        {
          cpf: professional.cpf,
          ...professional.person, // Dados de People
        },
      ]);

      // Inserir dados na tabela HealthProfessionals
      await queryInterface.bulkInsert('HealthProfessionals', [
        {
          cpf: professional.cpf, // Mesmo CPF usado como chave primária
          ...professional.healthProfessional, // Dados de HealthProfessionals
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    // Remover dados da tabela HealthProfessionals
    await queryInterface.bulkDelete('HealthProfessionals', null, {});

    // Remover dados da tabela People
    await queryInterface.bulkDelete('People', null, {});
  },
};
