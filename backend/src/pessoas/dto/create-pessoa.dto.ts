import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePessoaDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    nome: string;

    @IsString()
    senha: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    sexo: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(["paciente", "pesquisador", "profissional"])
    perfil: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    especialidade?: string;

    @IsOptional()
    @IsString()
    instituicao?: string;

    @IsOptional()
    @IsString()
    area?: string;

    @IsOptional()
    @IsDate()
    data_nascimento?: Date;

    @IsOptional()
    @IsString()
    escolaridade?: string;

    @IsOptional()
    @IsString()
    nivel_socio_economico?: string;

    @IsOptional()
    @IsNumber()
    peso?: number;

    @IsOptional()
    @IsNumber()
    altura?: number;
}
