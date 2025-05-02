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
        description: "CEP of the patient's address",
        example: '80060-130',
    })
    @IsString()
    @IsNotEmpty()
    cep: string;

    @ApiProperty({
        description: 'Street address of the patient',
        example: 'Street Nilo Cairo',
    })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({
        description: 'Street number of the patient',
        example: 282,
    })
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @ApiProperty({
        description: 'Neighborhood of the patient',
        example: 'Downtown',
    })
    @IsString()
    @IsNotEmpty()
    neighborhood: string;

    @ApiProperty({
        description: 'City of the patient',
        example: 'Curitiba',
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'State of the patient',
        example: 'PR',
    })
    @IsString()
    @IsNotEmpty()
    state: string;

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
