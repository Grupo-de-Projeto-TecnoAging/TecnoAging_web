import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { Teste } from "src/testes/entities/teste.entity";

@Table
export class DadoSensor extends Model{
    @Column({ primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
            type: DataType.INTEGER 
        })
    id: number;

    @ForeignKey(() => Teste)
    @Column({ allowNull: false,
            type: DataType.INTEGER
        })
    id_teste: number;

    @Column({ allowNull: false,
            type: DataType.DATE
        })
    tempo: Date;

    @Column({ allowNull: false,
            type: DataType.FLOAT})
    accel_x: number;

    @Column({ allowNull: false,
            type: DataType.FLOAT})
    accel_y: number;

    @Column({ allowNull: false,
            type: DataType.FLOAT})
    accel_z: number;

    @Column({ allowNull: false,
            type: DataType.FLOAT})
    gyro_x: number;

    @Column({ allowNull: false,
            type: DataType.FLOAT})
    gyro_y: number;

    @Column({ allowNull: false,
            type: DataType.FLOAT})
    gyro_z: number;

    @BelongsTo(() => Teste)
    teste: Teste;
}
