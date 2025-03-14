import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endereco: string;

    @Column({
        type: DataType.STRING,
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
        type: DataType.STRING,
        allowNull: false,
    })
    peso: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    altura: number;

    @BelongsTo(() => Pessoa)
    pessoa: Pessoa;
}
