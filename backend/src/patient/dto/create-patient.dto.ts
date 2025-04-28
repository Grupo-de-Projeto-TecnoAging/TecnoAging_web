import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePatientDto {
    @ApiProperty({
        description: 'Name of the patient',
        example: 'João da Silva',
    })
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        description: 'ID of the patient address',
        example: 123,
    })
    @IsNumber()
    @IsNotEmpty()
    id_address: number;

    @ApiProperty({
        description: 'Date of birth of the patient',
        example: '1990-01-01',
    })
    @IsDateString()
    @IsNotEmpty()
    dateOfBirth: Date;

    @ApiProperty({
        description: 'Education level of the patient',
        example: 'High School Diploma',
    })
    @IsString()
    @IsNotEmpty()
    educationLevel: string;

    @ApiProperty({
        description: 'Socioeconomic status of the patient',
        example: 'Middle Class',
    })
    @IsString()
    @IsNotEmpty()
    socioeconomicStatus: string;

    @ApiProperty({
        description: 'Weight of the patient in kilograms',
        example: 70,
    })
    @IsNumber()
    @IsNotEmpty()
    weight: number;

    @ApiProperty({
        description: 'Height of the patient in centimeters',
        example: 175,
    })
    @IsNumber()
    @IsNotEmpty()
    height: number;

    @ApiProperty({
        description: 'Age of the patient',
        example: 33,
    })
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty({
        description: 'Indicates if the patient has experienced falls',
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    downFall: boolean;

}
