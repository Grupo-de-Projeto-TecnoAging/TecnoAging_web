import { IsNotEmpty } from "class-validator";

export class CreateTestesDto {
    
    @IsNotEmpty()
    tipo: "5TSTS" | "TUG";
}
