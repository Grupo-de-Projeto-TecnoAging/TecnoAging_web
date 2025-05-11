import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';

@Table
export class HealthUnit extends Model {
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
  cep: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  neighborhood: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @HasMany(() => Evaluation)
  evaluation: Evaluation[];
}
