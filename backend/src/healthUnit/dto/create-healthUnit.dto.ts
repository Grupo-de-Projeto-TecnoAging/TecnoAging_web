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
        description: 'Identifier of the address',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    id_address: number;
}
