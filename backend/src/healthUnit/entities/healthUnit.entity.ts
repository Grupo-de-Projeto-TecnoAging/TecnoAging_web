import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Endereco } from 'src/address/entities/address.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';

@Table
export class healthUnit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Endereco)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id_endereco: string;

  @BelongsTo(() => Endereco, { foreignKey: 'id_endereco', targetKey: 'endereco_cep' })
  endereco: Endereco;

  @HasMany(() => Evaluation)
  evaluation: Evaluation[];
}
