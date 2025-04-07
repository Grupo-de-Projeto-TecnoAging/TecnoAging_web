'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Pacientes', [
    {
      cpf: "11111111111",
      nome: "Claudio da Silva",
      senha: "paciente",
      telefone: "112345678",
      sexo: "M",
      perfil: "paciente",
      endereco: "Endereco",
      data_nascimento: "1955-01-01",
      escolaridade: "Superior Completo",
      nivel_socio_economico: "Medio",
      peso: "70.0",
      altura: "1.80",
      idade: "86",
      queda: false
    },
    {
      cpf: "22222222222",
      nome: "Maria da Silva",
      senha: "paciente",
      telefone: "112345678",
      sexo: "F",
      perfil: "paciente",
      endereco: "Endereco",
      data_nascimento: "1955-04-12",
      escolaridade: "Superior Completo",
      nivel_socio_economico: "Medio",
      peso: "70.0",
      altura: "1.57",
      idade: "76",
      queda: true
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pacientes', null, {});
  }
};
