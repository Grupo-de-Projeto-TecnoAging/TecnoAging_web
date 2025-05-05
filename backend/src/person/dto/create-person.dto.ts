import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonDto {
    @ApiProperty({
        description: 'CPF do Usuario',
        example: '000.111.222-33',
    })
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        description: 'Name of the person',
        example: 'João da Silva',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Password of the person',
        example: 'N8df98d',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Phone number of the person',
        example: '99999-9999',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'Gender of the person',
        example: 'Male',
    })
    @IsString()
    gender: string;

    @ApiProperty({
        description: 'Profile of the person',
        example: 'Patient',
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["patient", "researcher", "healthProfessional"])
    profile: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Email of the person',
        example: 'joaosilva@example.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Expertise of the Health Professional',
        example: 'Physical Education',
    })
    @IsOptional()
    @IsString()
    expertise?: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Institution of the Health Professional',
        example: 'Federal University of Paraná',
    })
    @IsOptional()
    @IsString()
    institution?: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Field of study of the Researcher',
        example: 'Sports Science',
    })
    @IsOptional()
    @IsString()
    fieldOfStudy?: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Defines the ID of the address',
        example: '1',
    })


    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Date of birth of the person',
        example: '1957-01-01',
    })
    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Education level of the person',
        example: 'High School Diploma',
    })
    @IsOptional()
    @IsString()
    educationLevel?: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Socioeconomic status of the patient',
        example: 'Media Class',
    })
    @IsOptional()
    @IsString()
    socioeconomicStatus?: string;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Weight of the patient in kilograms',
        example: '70',
    })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Height of the patient in centimeters',
        example: '172',
    })
    @IsOptional()
    @IsNumber()
    height?: number;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Age of the patient',
        example: '68',
    })
    @IsOptional()
    @IsNumber()
    age?: number;

    @ApiPropertyOptional()
    @ApiProperty({
        description: 'Indicates if the person suffered a fall',
        example: 'true',
    })
    @IsOptional()
    @IsBoolean()
    downFall?: boolean;
}
