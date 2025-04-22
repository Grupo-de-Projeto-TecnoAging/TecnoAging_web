import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Expertise } from "../entities/healthProfessional.entity";

export class CreateHealthProfessionalDto {

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsEnum(Expertise)
    @IsNotEmpty()
    @IsString()
    expertise: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
