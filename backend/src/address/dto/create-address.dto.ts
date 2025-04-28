import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAddressDto {

    @ApiProperty({
        description: 'Postal code of the address',
        example: '80010-000',
    })
    @IsString()
    @IsNotEmpty()
    address_cep: string

    @ApiProperty({
        description: 'House or building number',
        example: 456,
    })
    @IsNumber()
    @IsNotEmpty()
    number: number

    @ApiProperty({
        description: 'Street name of the address',
        example: 'Rua das Flores',
    })
    @IsString()
    @IsNotEmpty()
    street: string

    @ApiProperty({
        description: 'Additional address details',
        example: 'Apartment 202',
    })
    @IsString()
    @IsNotEmpty()
    complement: string

    @ApiProperty({
        description: 'Neighborhood of the address',
        example: 'Centro',
    })
    @IsString()
    @IsNotEmpty()
    neighborhood: string

    @ApiProperty({
        description: 'City of the address',
        example: 'Curitiba',
    })
    @IsString()
    @IsNotEmpty()
    city: string

    @ApiProperty({
        description: 'State of the address',
        example: 'PR',
    })
    @IsString()
    @IsNotEmpty()
    state: string
}
