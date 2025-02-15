/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUnidadeDto {
    
    @IsString()
    @IsNotEmpty()
    nome: string;
    
    @IsString()
    @IsNotEmpty()
    endereco: string;
}
