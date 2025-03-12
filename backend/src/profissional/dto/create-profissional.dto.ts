import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Especialidade } from "../entities/profissional.entity";
import { Is } from "sequelize-typescript";

export class CreateProfissionalDto {

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsEnum(Especialidade)
    @IsNotEmpty()
    @IsString()
    especialidade: string;
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    }
