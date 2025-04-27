'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //TODO: Implementar seed de dados para a tabela de sensores
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('Person', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    //TODO: Implementar a remoção dos dados da tabela de sensores
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Person', null, {});
     */
  }
};
