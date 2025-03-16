import { IsNotEmpty, IsString } from "class-validator";

export class CreatePesquisadorDto {

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    instituicao: string;
    
    @IsString()
    @IsNotEmpty()
    area: string;
    
    @IsString()
    @IsNotEmpty()
    especialidade: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;
}
