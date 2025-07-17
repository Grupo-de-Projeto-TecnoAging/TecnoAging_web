export class Endereco {
    constructor(data) {
        this.id = data.id;
        this.endereco_cep = data.endereco_cep;
        this.numero = data.numero;
        this.rua = data.rua;
        this.complemento = data.complemento;
        this.bairro = data.bairro;
        this.cidade = data.cidade;
        this.estado = data.estado;
    }

    toJSON() {
        return {
            id: this.id,
            endereco_cep: this.endereco_cep,
            numero: this.numero,
            rua: this.rua,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado
        };
    }

    static fromJSON(json) {
        return new Endereco(json);
    }
} 