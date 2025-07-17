export class Paciente {
    constructor(data) {
        this.cpf = data.cpf;
        this.dateOfBirth = data.data_nascimento
            ? new Date(data.data_nascimento).toISOString().split('T')[0]
            : null;
        this.educationLevel = data.escolaridade;
        this.socioeconomicStatus = data.nivel_socio_economico;
        this.cep = data.endereco_cep;
        this.street = data.rua;
        this.number = data.numero;
        this.neighborhood = data.bairro;
        this.city = data.cidade;
        this.state = data.estado;
        this.weight = data.peso ? parseFloat(data.peso) : null;
        this.height = data.altura ? parseFloat(data.altura) : null;
        this.age = data.data_nascimento ? this.calculateAge(data.data_nascimento) : null;
        this.downFall = data.queda === 'true' || data.queda === true;
    }

    toJSON() {
        return {
            cpf: this.cpf,
            dateOfBirth: this.dateOfBirth,
            educationLevel: this.educationLevel,
            socioeconomicStatus: this.socioeconomicStatus,
            cep: this.cep,
            street: this.street,
            number: this.number,
            neighborhood: this.neighborhood,
            city: this.city,
            state: this.state,
            weight: this.weight,
            height: this.height,
            age: this.age,
            downFall: this.downFall,
        };
    }

    calculateAge(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    static fromJSON(json) {
        return new Paciente(json);
    }
}