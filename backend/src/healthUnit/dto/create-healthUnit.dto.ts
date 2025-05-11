/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatehealthUnitDto {
    
    @ApiProperty({
        description: 'Name of the health unit',
        example: 'Curitiba Hospital',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'CEP of the health unit',
        example: '89000-000',
    })
    @IsString()
    @IsNotEmpty()
    cep: string;

    @ApiProperty({
        description: 'Street address of the health unit',
        example: 'Street General Carneiro',
    })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({
        description: 'Street number of the health unit',
        example: 123,
    })
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @ApiProperty({
        description: 'Neighborhood of the health unit',
        example: 'Downtown',
    })
    @IsString()
    @IsNotEmpty()
    neighborhood: string;

    @ApiProperty({
        description: 'City of the health unit',
        example: 'Curitiba',
    })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'State of the Health Unit',
        example: 'PR',
    })
    @IsString()
    @IsNotEmpty()
    state: string;
}
