/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUnidadeDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    id_endereco: string;
}
