import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePessoaDto {
    @IsNumber()
    @IsNotEmpty()
    cpf: number;

    @IsString()
    nome: string;

    @IsString()
    senha: string;
 
    @IsNumber()
    telefone: number;

    @IsString()
    sexo: string;
    
    @IsString()
    perfil: string;
}
 