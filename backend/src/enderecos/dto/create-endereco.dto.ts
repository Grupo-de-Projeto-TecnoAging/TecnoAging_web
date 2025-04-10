import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateEnderecoDto {

    @IsString()
    @IsNotEmpty()
    endereco_cep: string

    @IsNumber()
    @IsNotEmpty()
    numero: number

    @IsString()
    @IsNotEmpty()
    rua: string

    @IsString()
    @IsNotEmpty()
    complemento: string

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
