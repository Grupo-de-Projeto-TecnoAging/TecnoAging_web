import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Paciente extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cpf_paciente: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    id_endereco: string;

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
}
