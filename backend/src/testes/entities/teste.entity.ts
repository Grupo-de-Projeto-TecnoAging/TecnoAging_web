import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Profissional } from "src/profissional/entities/profissional.entity";

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

  @BelongsTo(() => Profissional)
  profissional: Profissional;

}
