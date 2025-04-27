import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Address } from "src/address/entities/address.entity";
import { Person } from "src/person/entities/person.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";

@Table
export class Patient extends Model {

    @ForeignKey(() => Person)
    @Column({
        primaryKey: true,
        type: DataType.STRING(14),
        allowNull: false,
        autoIncrement: false
    })
    cpf: string;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    id_address: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    dateOfBirth: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    educationLevel: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    socioeconomicStatus: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    weight: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    height: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    age: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    downFall: boolean;

    @BelongsTo(() => Person)
    person: Person;

    @BelongsTo(() => Address, { foreignKey: 'id_address', targetKey: 'address_cep' })
    address: Address;

    @HasMany(() => Evaluation)
    evaluation: Evaluation[];
}
