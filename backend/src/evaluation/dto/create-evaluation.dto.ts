import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateSensorDataDto } from "src/sensorData/dto/create-sensorData.dto";

export class CreateEvaluationDto {

    @ApiProperty({
        description: 'Specifies the type of evaluation being performed',
        example: 'TUG',
    })
    @IsNotEmpty()
    @IsEnum(["5TSTS", "TUG"])
    type: "5TSTS" | "TUG";

    @ApiProperty({
        description: 'Specifies the CPF of the health professional responsible for the evaluation',
        example: '000.111.222-33',
    })
    @IsNotEmpty()
    @IsString()
    cpfHealthProfessional: string;

    @ApiProperty({
        description: 'Specifies the CPF of the patient being evaluated',
        example: '000.111.222-33',
    })
    @IsNotEmpty()
    @IsString()
    cpfPatient: string;
    
    @ApiProperty({
        description: 'Specifies the ID of the health unit where the evaluation is being performed',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    id_healthUnit: number;

    sensorData?: CreateSensorDataDto[];
}
