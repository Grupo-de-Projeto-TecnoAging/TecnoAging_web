import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateSensorDataDto } from "src/sensorData/dto/create-sensorData.dto";

export class CreateEvaluationDto {

    @IsNotEmpty()
    @IsEnum(["5TSTS", "TUG"])
    type: "5TSTS" | "TUG";

    @IsNotEmpty()
    @IsString()
    cpfHealthProfessional: string;

    @IsNotEmpty()
    @IsString()
    cpfPatient: string;
    
    @IsNotEmpty()
    @IsNumber()
    id_healthUnit: number;

    sensorData?: CreateSensorDataDto[];
}
