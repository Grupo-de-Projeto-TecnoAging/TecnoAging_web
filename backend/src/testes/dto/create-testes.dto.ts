import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTestesDto {

    @IsNotEmpty()
    @IsEnum(["5TSTS", "TUG"])
    tipo: "5TSTS" | "TUG";

    @IsNotEmpty()
    @IsString()
    id_pessoa: string;
}
