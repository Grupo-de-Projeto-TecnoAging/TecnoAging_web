import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Pesquisador } from "src/pesquisador/entities/pesquisador.entity";
import { Profissional } from "src/profissional/entities/profissional.entity";

@Table
export class Pessoa extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: false,
        type: DataType.STRING(14),
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
        type: DataType.STRING, // Alterado de INTEGER para STRING
        allowNull: false,
    })
    telefone: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sexo: string

    @Column({
        type: DataType.ENUM("paciente", "pesquisador", "profissional"), 
        allowNull: false,
    })
    perfil: "paciente" | "pesquisador" | "profissional"


    @HasOne(() => Profissional)
    profissional: Profissional;

    @HasOne(() => Pesquisador)
    pesquisador: Pesquisador;

    @HasOne(() => Paciente)
    paciente: Paciente;
}
