import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSensorDataDto {
    @ApiProperty({
        description: 'Timestamp of the sensor data',
        example: '2025-01-01T12:00:00Z',
    })
    @IsNotEmpty()
    @IsDate()
    time: Date;

    @ApiProperty({
        description: 'ID of the evaluation associated with this sensor data',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    id_evaluation: number;

    @ApiProperty({
        description: 'Acceleration in the X-axis',
        example: 0.12,
    })
    @IsNotEmpty()
    @IsNumber()
    accel_x: number;

    @ApiProperty({
        description: 'Acceleration in the Y-axis',
        example: -0.34,
    })
    @IsNotEmpty()
    @IsNumber()
    accel_y: number;

    @ApiProperty({
        description: 'Acceleration in the Z-axis',
        example: 9.81,
    })
    @IsNotEmpty()
    @IsNumber()
    accel_z: number;

    @ApiProperty({
        description: 'Gyroscope data in the X-axis',
        example: 0.01,
    })
    @IsNotEmpty()
    @IsNumber()
    gyro_x: number;

    @ApiProperty({
        description: 'Gyroscope data in the Y-axis',
        example: -0.02,
    })
    @IsNotEmpty()
    @IsNumber()
    gyro_y: number;

    @ApiProperty({
        description: 'Gyroscope data in the Z-axis',
        example: 0.03,
    })
    @IsNotEmpty()
    @IsNumber()
    gyro_z: number;
}
