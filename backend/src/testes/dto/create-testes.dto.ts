import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTestesDto {

    @IsNotEmpty()
    @IsEnum(["5TSTS", "TUG"])
    tipo: "5TSTS" | "TUG";

    @IsNotEmpty()
    @IsString()
    cpfProfissional: string;

    @IsNotEmpty()
    @IsNumber()
    id_unidade: number;
}
