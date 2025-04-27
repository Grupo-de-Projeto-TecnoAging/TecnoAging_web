'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init({
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    escolaridade: DataTypes.STRING,
    nivel_socio_economico: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    idade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};