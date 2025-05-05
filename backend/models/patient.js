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
    dateOfBirth: DataTypes.DATE,
    educationLevel: DataTypes.STRING,
    socioeconomicStatus: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    age: DataTypes.INTEGER,
    downFall: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};