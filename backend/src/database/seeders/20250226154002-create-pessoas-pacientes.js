'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pessoas', [
      {
        cpf: '123.456.789-01',
        nome: 'João Silva',
        senha: 'senha123',
        telefone: '11987654321',
        sexo: 'masculino',
        perfil: 'paciente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpf: '109.876.543-21',
        nome: 'Maria Oliveira',
        senha: 'senha456',
        telefone: '21987654321',
        sexo: 'feminino',
        perfil: 'paciente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};
