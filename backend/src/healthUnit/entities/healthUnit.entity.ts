import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Address } from 'src/address/entities/address.entity';
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
  name: string;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id_address: string;

  @BelongsTo(() => Address, { foreignKey: 'id_address', targetKey: 'address_cep' })
  address: Address;

  @HasMany(() => Evaluation)
  evaluation: Evaluation[];
}
