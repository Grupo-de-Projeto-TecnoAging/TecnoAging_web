import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDadoSensorDto {
   
        @IsNotEmpty()
        @IsNumber()
        id_teste: number;
    
        @IsNotEmpty()
        @IsDate()
        tempo: Date;
    
        @IsNotEmpty()
        @IsNumber()
        accel_x: number;
    
        @IsNotEmpty()
        @IsNumber()       
        accel_y: number;
    
        @IsNotEmpty()
        @IsNumber()
        accel_z: number;
    
        @IsNotEmpty()
        @IsNumber()
        gyro_x: number;
    
        @IsNotEmpty()
        @IsNumber()
        gyro_y: number;
    
        @IsNotEmpty()
        @IsNumber()
        gyro_z: number;
}
