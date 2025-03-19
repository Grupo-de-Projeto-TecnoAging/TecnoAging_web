import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Teste } from 'src/testes/entities/teste.entity';

@Table
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

  @HasMany(() => Teste)
  testes: Teste[];
}
