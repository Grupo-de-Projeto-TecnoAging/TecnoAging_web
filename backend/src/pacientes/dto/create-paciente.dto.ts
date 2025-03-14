import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePacienteDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;

    @IsDate()
    @IsNotEmpty()
    data_nascimento: Date;

    @IsString()
    @IsNotEmpty()
    escolaridade: string;

    @IsString()
    @IsNotEmpty()
    nivel_socio_economico: string;

    @IsNumber()
    @IsNotEmpty()
    peso: number;

    @IsNumber()
    @IsNotEmpty()
    altura: number;
}
  