'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paciente.init({
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    escolaridade: DataTypes.STRING,
    nivel_socio_economico: DataTypes.STRING,
    peso: DataTypes.FLOAT,
    altura: DataTypes.FLOAT,
    idade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};