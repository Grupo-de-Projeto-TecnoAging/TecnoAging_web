import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";

@Table
export class SensorData extends Model{
    @Column({ primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
            type: DataType.INTEGER 
        })
    id: number;

    @ForeignKey(() => Evaluation)
    @Column({ field: 'id_evaluation',
        allowNull: false,
        type: DataType.INTEGER
        })
    id_evaluation: number;

    @Column({ allowNull: false,
            type: DataType.DATE
        })
    time: Date;

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

    @BelongsTo(() => Evaluation)
    evaluation: Evaluation;
}
