import API_URL from './api';

export const api = {
    async createPerson(dados) {
        try {
            const response = await fetch(`${API_URL}/Person`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData?.message || 'Erro ao cadastrar pessoa';
                throw new Error(message);
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Erro ao cadastrar pessoa');
        }
    },

    async createProfile(tipo, dados) {
        try {
            const response = await fetch(`${API_URL}/${tipo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            throw new Error(`Erro ao cadastrar ${tipo}`);
        }
    },

    async getAllPersons() {
        try {
            const response = await fetch(`${API_URL}/Person`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            throw new Error('Erro ao listar pessoas');
        }
    },

    async getPersonByCpf(cpf) {
        try {
            const response = await fetch(`${API_URL}/Person/${cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar pessoa:', error);
            throw new Error('Erro ao buscar pessoa: ' + error.message);
        }
    },

    async deletePerson(cpf) {
        try {
            const response = await fetch(`${API_URL}/Person/${cpf}`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }
            return { message: 'Pessoa deletada com sucesso' };
        } catch (error) {
            console.error(`Erro ao deletar pessoa com cpf ${cpf}:`, error);
            throw error;
        }
    },

    async getPerfilByCpf(endpoint) {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            throw new Error(`Erro ao buscar perfil: ${error}`);
        }
    },

    async updatePerson(cpf, dados) {
        try {
            const response = await fetch(`${API_URL}/Person/${cpf}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao atualizar pessoa com CPF ${id}:`, error);
            throw error;
        }
    },
};