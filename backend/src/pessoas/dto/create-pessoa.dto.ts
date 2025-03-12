import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    email?: string; // Email opcional para 'profissional'
  
    @IsOptional()
    @IsString()
    especialidade?: string;
}
