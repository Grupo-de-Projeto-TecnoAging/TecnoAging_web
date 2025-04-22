
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Person } from "src/person/entities/person.entity";
import { Teste } from "src/testes/entities/teste.entity";

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

    @HasMany(() => Teste)
    testes: Teste[];
}

export enum Expertise {
    ED_FISICA = "edFisica"
}