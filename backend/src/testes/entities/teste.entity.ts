import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { DadoSensor } from "src/dado-sensor/entities/dado-sensor.entity";
import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Profissional } from "src/profissional/entities/profissional.entity";
import { Unidade } from "src/unidades/entities/unidade.entity";

@Table
export class Teste extends Model {
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

  @ForeignKey(() => Profissional)
  @Column({
   type: DataType.STRING,
   allowNull: false,
 })
  cpfProfissional: string;

  @ForeignKey(() => Paciente)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpfPaciente: string;

  @ForeignKey(() => Unidade)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_unidade: number;

  @BelongsTo(() => Profissional)
  profissional: Profissional;

  @BelongsTo(() => Unidade)
  unidade: Unidade;

  @BelongsTo(() => Paciente)
  paciente: Paciente;

  @HasMany(() => DadoSensor)
  dadosSensor: DadoSensor[];
}
