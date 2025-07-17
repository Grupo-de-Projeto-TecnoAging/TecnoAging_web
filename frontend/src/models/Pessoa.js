export class Pessoa {
    constructor(data, perfil) {
        this.cpf = this.cleanCpf(data.cpf);
        this.name = data.name;
        this.password = data.password;
        this.phone = data.phone;
        this.gender = data.gender;
        this.profile = this.mapPerfil(perfil);
    }

    toJSON() {
        return {
            cpf: this.cpf,
            name: this.name,
            password: this.password,
            phone: this.phone,
            gender: this.gender,
            profile: this.profile,
        };
    }

    mapPerfil(perfil) {
        switch (perfil) {
            case 'pesquisador': return 'researcher';
            case 'profissional': return 'healthProfessional';
            default: return 'patient';
        }
    }

    cleanCpf(cpf) {
        return cpf?.replace(/\D/g, '') || '';
    }

    static fromJSON(json) {
        return new Pessoa({
            cpf: json.cpf,
            nome: json.name,
            senha: json.password,
            telefone: json.phone,
            sexo: json.gender,
        }, json.profile);
    }
}
