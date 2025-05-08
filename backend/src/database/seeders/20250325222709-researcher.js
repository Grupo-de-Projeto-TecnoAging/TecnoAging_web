'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const researchers = [
      {
        cpf: "222.222.222-01",
        person: {
          name: "Raquel de Oliveira",
          password: "researcher",
          phone: "112345678",
          gender: "F",
          profile: "researcher",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        researcher: {
          email: "researcher1@email.com",
          expertise: "Ortopedia",
          institution: "UFPR",
          fieldOfStudy: "Saude",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        cpf: "222.222.222-02",
        person: {
          name: "João da Silva",
          password: "researcher",
          phone: "112345678",
          gender: "M",
          profile: "researcher",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        researcher: {
          email: "researcher2@email.com",
          expertise: "Geriatra",
          institution: "UFPR",
          fieldOfStudy: "Saude",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ];

    for (const researcher of researchers) {
      await queryInterface.bulkInsert('People', [
        {
          cpf: researcher.cpf,
          ...researcher.person, // Dados de People
        },
      ]);

      // Inserir dados na tabela Researchers
      await queryInterface.bulkInsert('Researchers', [
        {
          cpf: researcher.cpf, // Mesmo CPF usado como chave primária
          ...researcher.researcher, // Dados de Researchers
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    // Remover dados da tabela Researchers
    await queryInterface.bulkDelete('Researchers', null, {});

    // Remover dados da tabela People
    await queryInterface.bulkDelete('People', null, {});
  },
};
