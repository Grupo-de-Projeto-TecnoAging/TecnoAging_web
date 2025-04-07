import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Teste } from "src/testes/entities/teste.entity";

@Table
export class Paciente extends Model {

    @ForeignKey(() => Pessoa)
    @Column({
        primaryKey: true,
        type: DataType.STRING(14),
        allowNull: false,
        autoIncrement: false
    })
    cpf: string;

    //@ForeignKey(() => Endereco)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endereco: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    data_nascimento: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    escolaridade: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nivel_socio_economico: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    peso: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    altura: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idade: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    queda: boolean;

    @BelongsTo(() => Pessoa)
    pessoa: Pessoa;

    @HasMany(() => Teste)
    testes: Teste[];
}
