enum Gender {
    male,
    female
}

export interface Person {
    name: string;
    cpf: string;
    gender: Gender;
}