'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SensorData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SensorData.init({
    id_evaluation: DataTypes.INTEGER,
    time: DataTypes.DATE,
    accel_x: DataTypes.FLOAT,
    accel_y: DataTypes.FLOAT,
    accel_z: DataTypes.FLOAT,
    gyro_x: DataTypes.FLOAT,
    gyro_y: DataTypes.FLOAT,
    gyro_z: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SensorData',
  });
  return SensorData;
};