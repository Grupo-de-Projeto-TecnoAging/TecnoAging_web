import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAddressDto {

    @IsString()
    @IsNotEmpty()
    address_cep: string

    @IsNumber()
    @IsNotEmpty()
    number: number

    @IsString()
    @IsNotEmpty()
    street: string

    @IsString()
    @IsNotEmpty()
    complement: string

    @IsString()
    @IsNotEmpty()
    neighborhood: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    state: string
}
