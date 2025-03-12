
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";

@Table
export class Profissional extends Model {
    
    @ForeignKey(() => Pessoa)
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
    especialidade: Especialidade;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @BelongsTo(() => Pessoa)
    pessoa: Pessoa;
}

export enum Especialidade {
    ED_FISICA = "edFisica"
}