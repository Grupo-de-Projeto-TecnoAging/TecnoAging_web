import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Unidade extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id:number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  endereco: string;
}
