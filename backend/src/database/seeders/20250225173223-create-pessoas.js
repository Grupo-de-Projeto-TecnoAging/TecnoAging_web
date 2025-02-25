'use strict';
//npx sequelize-cli db:seed:all
//npx sequelize-cli db:seed:undo:all
//npx sequelize-cli db:seed:generate --name create-unidade
//npx sequelize-cli db:seed:undo
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pessoas', [
      {
        cpf: '012.345.678-90',
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
        perfil: 'pesquisador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};
