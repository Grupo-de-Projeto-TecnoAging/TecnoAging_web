import { Column, DataType, Model, Table } from "sequelize-typescript";

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id_pessoa: string;
}
