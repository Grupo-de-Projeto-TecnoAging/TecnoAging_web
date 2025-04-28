import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Expertise } from "../entities/healthProfessional.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHealthProfessionalDto {

    @ApiProperty({
        description: 'CPF of the health professional',
        example: '000.111.222-33',
    })
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        description: 'Expertise of the health professional',
        example: 'Physical Education',
    })
    @IsEnum(Expertise)
    @IsNotEmpty()
    @IsString()
    expertise: string;

    @ApiProperty({
        description: 'Email of the health professional',
        example: 'joaosilva@example.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
