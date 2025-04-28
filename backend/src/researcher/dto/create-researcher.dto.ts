import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateResearcherDto {

    @ApiProperty({
        description: 'CPF of the researcher',
        example: '000.111.222-33',
    })
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        description: 'Institution where the researcher works',
        example: 'Federal University of Paraná',
    })
    @IsString()
    @IsNotEmpty()
    institution: string;
    
    @ApiProperty({
        description: 'Field of study of the researcher',
        example: 'Sports Science',
    })
    @IsString()
    @IsNotEmpty()
    fieldOfStudy: string;
    
    @ApiProperty({
        description: 'Expertise of the researcher',
        example: 'Physical Education',
    })
    @IsString()
    @IsNotEmpty()
    expertise: string;
    
    @ApiProperty({
        description: 'Email of the researcher',
        example: 'researcher@example.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;
}
