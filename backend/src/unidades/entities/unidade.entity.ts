import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Endereco } from 'src/enderecos/entities/endereco.entity';
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

  @ForeignKey(() => Endereco)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_endereco: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;

  @HasMany(() => Teste)
  testes: Teste[];
}
 