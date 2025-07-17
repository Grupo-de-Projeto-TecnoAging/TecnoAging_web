export class Pesquisador {
    constructor(data) {
        this.cpf = data.cpf;
        this.institution = data.instituicao;
        this.fieldOfStudy = data.area;
        this.expertise = data.especialidade;
        this.email = data.email;
    }

    toJSON() {
        return {
            cpf: this.cpf,
            institution: this.institution,
            fieldOfStudy: this.fieldOfStudy,
            expertise: this.expertise,
            email: this.email
        };
    }

    static fromJSON(json) {
        return new Pesquisador({
            cpf: json.cpf,
            instituicao: json.institution,
            area: json.fieldOfStudy,
            especialidade: json.expertise,
            email: json.email
        });
    }
}
