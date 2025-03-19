'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teste.init({
    tipo: DataTypes.ENUM,
    cpfProfissional: DataTypes.STRING,
    cpfPaciente: DataTypes.STRING,
    id_unidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teste',
  });
  return Teste;
};