import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript"
import { HealthProfessional } from "src/healthProfessional/entities/healthProfessional.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { Researcher } from "src/researcher/entities/researcher.entity";

@Table
export class Person extends Model {
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
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @Column({
        type: DataType.STRING, // Alterado de INTEGER para STRING
        allowNull: false,
    })
    phone: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    gender: string

    @Column({
        type: DataType.ENUM("patient", "researcher", "healthProfessional"), 
        allowNull: false,
    })
    profile: "patient" | "researcher" | "healthProfessional"


    @HasOne(() => HealthProfessional)
    healthProfessional: HealthProfessional;

    @HasOne(() => Researcher)
    researcher: Researcher;

    @HasOne(() => Patient)
    patient: Patient;
}
