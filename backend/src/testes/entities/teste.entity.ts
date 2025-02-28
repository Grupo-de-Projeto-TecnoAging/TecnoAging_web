import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";

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

  @ForeignKey(() => Pessoa)
  @Column({
   type: DataType.STRING,
   allowNull: false,
 })
 cpfPessoa: string;

 @BelongsTo(() => Pessoa)
 pessoa: Pessoa;
}
