import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Unidade } from "src/unidades/entities/unidade.entity";

@Table
export class Endereco extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, // Ensure endereco_cep is unique
    })
    endereco_cep: string
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    numero: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    rua: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    complemento: string

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

    @HasOne(() => Paciente)
    paciente: Paciente;
    
    @HasOne(() => Unidade)
    unidade: Unidade;
}
