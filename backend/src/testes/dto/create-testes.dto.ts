import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDadoSensorDto } from "src/dado-sensor/dto/create-dado-sensor.dto";

export class CreateTestesDto {

    @IsNotEmpty()
    @IsEnum(["5TSTS", "TUG"])
    tipo: "5TSTS" | "TUG";

    @IsNotEmpty()
    @IsString()
    cpfProfissional: string;

    @IsNotEmpty()
    @IsString()
    cpfPaciente: string;
    
    @IsNotEmpty()
    @IsNumber()
    id_unidade: number;

    dadosSensor?: CreateDadoSensorDto[];
}
