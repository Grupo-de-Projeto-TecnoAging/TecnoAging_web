import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Person } from "src/person/entities/person.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";

@Table
export class Patient extends Model {

    @ForeignKey(() => Person)
    @Column({
        primaryKey: true,
        type: DataType.STRING(14),
        allowNull: false,
        autoIncrement: false
    })
    cpf: string;

    @ForeignKey(() => Endereco)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    id_endereco: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    dateOfBirth: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    educationLevel: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    socioeconomicStatus: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    weight: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    height: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    age: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    downFall: boolean;

    @BelongsTo(() => Person)
    person: Person;

    @BelongsTo(() => Endereco, { foreignKey: 'id_endereco', targetKey: 'endereco_cep' })
    endereco: Endereco;

    @HasMany(() => Evaluation)
    evaluation: Evaluation[];
}
