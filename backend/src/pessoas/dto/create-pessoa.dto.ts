import { IsNotEmpty, IsString } from "class-validator";

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
    perfil: string;
}
