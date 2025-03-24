import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePacienteDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsNumber()
    @IsNotEmpty()
    id_endereco: number;

    @IsDateString()
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

    @IsNumber()
    @IsNotEmpty()
    idade: number;
}
