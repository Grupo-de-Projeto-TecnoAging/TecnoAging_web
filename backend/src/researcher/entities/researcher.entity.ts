import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Person } from "src/person/entities/person.entity";

@Table
export class Researcher extends Model {

    @ForeignKey(() => Person)
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
    institution: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fieldOfStudy: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    expertise: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @BelongsTo(() => Person)
    person: Person;

}
