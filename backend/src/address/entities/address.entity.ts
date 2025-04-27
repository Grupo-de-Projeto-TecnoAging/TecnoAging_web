import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Patient } from "src/patient/entities/patient.entity";
import { healthUnit } from "src/healthUnit/entities/healthUnit.entity";

@Table
export class Address extends Model {

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
        unique: true, // Ensure address_cep is unique
    })
    address_cep: string
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    number: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    street: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    complement: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    neighborhood: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    city: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    state: string

    @HasOne(() => Patient)
    patient: Patient;
    
    @HasOne(() => healthUnit)
    healthUnit: healthUnit;
}
