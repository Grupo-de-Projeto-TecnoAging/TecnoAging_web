/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUnidadeDto {
    
    @IsString()
    @IsNotEmpty()
    nome: string;
    
    @IsNumber()
    @IsNotEmpty()
    id_endereco: number;
}
