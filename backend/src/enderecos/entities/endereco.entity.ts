import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CreateEnderecoDto } from "../dto/create-endereco.dto";

@Table
export class Endereco extends Model{

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    numero: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endereco: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    complemento: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cep: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bairro: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cidade: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    estado: string
}
