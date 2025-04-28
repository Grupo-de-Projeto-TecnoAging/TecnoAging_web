import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    gender: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(["patient", "researcher", "healthProfessional"])
    profile: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    expertise?: string;

    @IsOptional()
    @IsString()
    institution?: string;

    @IsOptional()
    @IsString()
    fieldOfStudy?: string;

    @IsOptional()
    @IsNumber()
    id_address?: number;

    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    educationLevel?: string;

    @IsOptional()
    @IsString()
    socioeconomicStatus?: string;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsNumber()
    age?: number;

    @IsOptional()
    @IsBoolean()
    downFall?: boolean;
}
