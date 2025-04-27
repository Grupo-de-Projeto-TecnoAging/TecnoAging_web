
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Person } from "src/person/entities/person.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";

@Table
export class HealthProfessional extends Model {
    
    @ForeignKey(() => Person)
    @Column({
        primaryKey: true,
        type: DataType.STRING(14),
        allowNull: false,
        autoIncrement: false
    })
    cpf: string;

    @Column({
        type: DataType.ENUM("edFisica"),
        allowNull: false,
    })
    expertise: Expertise;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @BelongsTo(() => Person)
    person: Person;

    @HasMany(() => Evaluation)
    evaluation: Evaluation[];
}

export enum Expertise {
    ED_FISICA = "edFisica"
}