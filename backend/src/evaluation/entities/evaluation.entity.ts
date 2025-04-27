import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SensorData } from "src/sensorData/entities/sensorData.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { HealthProfessional } from "src/healthProfessional/entities/healthProfessional.entity";
import { healthUnit } from "src/healthUnit/entities/healthUnit.entity";

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
  tipo: "5TSTS" | "TUG";

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

  @ForeignKey(() => healthUnit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_healthUnit: number;

  @BelongsTo(() => HealthProfessional)
  healthProfessional: HealthProfessional;

  @BelongsTo(() => healthUnit)
  healthUnit: healthUnit;

  @BelongsTo(() => Patient)
  patient: Patient;

  @HasMany(() => SensorData)
  sensorData: SensorData[];
}
