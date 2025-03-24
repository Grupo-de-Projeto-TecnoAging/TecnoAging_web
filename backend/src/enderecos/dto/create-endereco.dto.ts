import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateEnderecoDto {

    @IsNumber()
    @IsNotEmpty()
    numero: number

    @IsString()
    @IsNotEmpty()
    endereco: string

    @IsString()
    @IsNotEmpty()
    complemento: string

    @IsString()
    @IsNotEmpty()
    cep: string

    @IsString()
    @IsNotEmpty()
    bairro: string

    @IsString()
    @IsNotEmpty()
    cidade: string

    @IsString()
    @IsNotEmpty()
    estado: string
}
