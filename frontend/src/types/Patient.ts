import { Person } from "./Person";


export interface Patient extends Person {

}

export interface PatientWithID extends Patient{
    uId: number;
}