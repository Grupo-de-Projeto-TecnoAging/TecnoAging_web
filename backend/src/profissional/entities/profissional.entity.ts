import { Column, DataType, Table } from "sequelize-typescript";

@Table
export class Profissional {
    
    @Column({
        type: DataType.ENUM("ed_fisica"),
        allowNull: false,
    })
    especialidade: Especialidade;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

}

export enum Especialidade {
    ED_FISICA = "ed_fisica"
}