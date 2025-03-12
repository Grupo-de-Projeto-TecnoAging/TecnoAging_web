import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { Profissional } from "src/profissional/entities/profissional.entity";
import { Teste } from "src/testes/entities/teste.entity";

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

    @HasMany(() => Teste)
    testes: Teste[];

    @HasOne(() => Profissional)
    profissional: Profissional;
}
