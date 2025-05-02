import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SensorData } from "src/sensorData/entities/sensorData.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { HealthProfessional } from "src/healthProfessional/entities/healthProfessional.entity";
import { HealthUnit } from "src/healthUnit/entities/healthUnit.entity";

@Table
export class Evaluation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.ENUM("5TSTS", "TUG"),
    allowNull: false,
  })
  type: "5TSTS" | "TUG";

  @ForeignKey(() => HealthProfessional)
  @Column({
   type: DataType.STRING,
   allowNull: false,
 })
  cpfHealthProfessional: string;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpfPatient: string;

  @ForeignKey(() => HealthUnit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_healthUnit: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  totalTime: string;

  @BelongsTo(() => HealthProfessional)
  healthProfessional: HealthProfessional;

  @BelongsTo(() => HealthUnit)
  healthUnit: HealthUnit;

  @BelongsTo(() => Patient)
  patient: Patient;

  @HasMany(() => SensorData)
  sensorData: SensorData[];
}
