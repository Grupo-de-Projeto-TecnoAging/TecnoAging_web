
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Teste } from "src/testes/entities/teste.entity";

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

    @HasMany(() => Teste)
    testes: Teste[];
}

export enum Especialidade {
    ED_FISICA = "edFisica"
}