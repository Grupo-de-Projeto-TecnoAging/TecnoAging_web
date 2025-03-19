'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DadoSensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DadoSensor.init({
    id_teste: DataTypes.INTEGER,
    tempo: DataTypes.DATE,
    accel_x: DataTypes.FLOAT,
    accel_y: DataTypes.FLOAT,
    accel_z: DataTypes.FLOAT,
    gyro_x: DataTypes.FLOAT,
    gyro_y: DataTypes.FLOAT,
    gyro_z: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'DadoSensor',
  });
  return DadoSensor;
};