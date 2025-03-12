import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";

@Table
export class Pesquisador extends Model{

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
    instituicao: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    area: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    especialidade: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @BelongsTo(() => Pessoa)
    pessoa: Pessoa;
    
}
