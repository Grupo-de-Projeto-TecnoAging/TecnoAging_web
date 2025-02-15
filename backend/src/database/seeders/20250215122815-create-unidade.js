'use strict';
//npx sequelize-cli db:seed:all
//npx sequelize-cli db:seed:undo:all
//npx sequelize-cli db:seed:generate --name create-unidade
//npx sequelize-cli db:seed:undo
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('unidades', [
      {
        nome: 'Unidade 1',
        endereco: 'Endereço 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Unidade 2',
        endereco: 'Endereço 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('unidades', null, {});
  }
};
