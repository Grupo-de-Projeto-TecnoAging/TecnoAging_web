import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
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
        type: DataType.STRING,
        allowNull: false,
    })
    cep: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    street: string;

    @Column({
        type: DataType.STRING,
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    state: string;

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

    @HasMany(() => Evaluation)
    evaluation: Evaluation[];
}
