import { Column, DataType, Model, Table } from "sequelize-typescript"

export enum Perfil {
    Paciente = "paciente",
    Pesquisador = "pesquisador",
    Profissional = "profissional"
}

@Table
export class Pessoa extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: false,
        type: DataType.STRING,
        allowNull: false,
    })
    cpf: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nome: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    senha: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    telefone: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sexo: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    perfil: Perfil
}
