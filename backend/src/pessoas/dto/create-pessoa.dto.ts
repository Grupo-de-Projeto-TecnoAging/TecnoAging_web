import { IsEnum, IsNotEmpty, IsString } from "class-validator";

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
}
