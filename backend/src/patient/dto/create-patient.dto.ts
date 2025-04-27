import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    id_address: string;

    @IsDateString()
    @IsNotEmpty()
    dateOfBirth: Date;

    @IsString()
    @IsNotEmpty()
    educationLevel: string;

    @IsString()
    @IsNotEmpty()
    socioeconomicStatus: string;

    @IsNumber()
    @IsNotEmpty()
    weight: number;

    @IsNumber()
    @IsNotEmpty()
    height: number;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsBoolean()
    @IsNotEmpty()
    downFall: boolean;

}
