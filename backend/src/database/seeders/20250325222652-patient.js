'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const patients = [
      {
        cpf: "111.111.111-01",
        person: {
          name: "Claudio da Silva",
          password: "patient",
          phone: "112345678",
          gender: "M",
          profile: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        patient: {
          dateOfBirth: "1955-01-01",
          educationLevel: "Superior Completo",
          socioeconomicStatus: "Medio",
          cep: "80060-140",
          street: "Rua Dr Faivre",
          number: 123,
          neighborhood: "Centro",
          city: "Curitiba",
          state: "Paraná",
          weight: "70.0",
          height: "1.80",
          age: "86",
          downFall: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        cpf: "111.111.111-02",
        person: {
          name: "Mariana Oliveira",
          password: "patient",
          phone: "11987654321",
          gender: "F",
          profile: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        patient: {
          dateOfBirth: "1960-05-15",
          educationLevel: "Ensino Médio Completo",
          socioeconomicStatus: "Baixo",
          cep: "12345-678",
          street: "Avenida Brasil",
          number: 456,
          neighborhood: "Jardim América",
          city: "São Paulo",
          state: "São Paulo",
          weight: "65.0",
          height: "1.65",
          age: "63",
          downFall: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ];

    // Inserir dados na tabela People
    for (const patient of patients) {
      await queryInterface.bulkInsert('People', [
        {
          cpf: patient.cpf,
          ...patient.person, // Dados de People
        },
      ]);

      // Inserir dados na tabela Patients
      await queryInterface.bulkInsert('Patients', [
        {
          cpf: patient.cpf, // Mesmo CPF usado como chave primária
          ...patient.patient, // Dados de Patients
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    // Remover dados da tabela Patients
    await queryInterface.bulkDelete('Patients', null, {});

    // Remover dados da tabela People
    await queryInterface.bulkDelete('People', null, {});
  },
};
