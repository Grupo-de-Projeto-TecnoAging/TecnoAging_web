import { IsNotEmpty, IsString } from "class-validator";

export class CreateResearcherDto {

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    institution: string;
    
    @IsString()
    @IsNotEmpty()
    fieldOfStudy: string;
    
    @IsString()
    @IsNotEmpty()
    expertise: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;
}
