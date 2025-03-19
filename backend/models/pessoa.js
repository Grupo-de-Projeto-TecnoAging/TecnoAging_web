'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pessoa.init({
    cpf: DataTypes.STRING,
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING,
    sexo: DataTypes.STRING,
    perfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
  });
  return Pessoa;
};