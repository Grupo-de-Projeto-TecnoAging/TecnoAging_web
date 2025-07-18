'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthProfessional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthProfessional.init({
    cpf: DataTypes.STRING,
    especialidade: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HealthProfessional',
  });
  return HealthProfessional;
};