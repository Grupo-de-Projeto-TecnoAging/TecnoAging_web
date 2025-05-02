'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Researcher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Researcher.init({
    cpf: DataTypes.STRING,
    institution: DataTypes.STRING,
    fieldOfStudy: DataTypes.STRING,
    expertise: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Researcher',
  });
  return Researcher;
};