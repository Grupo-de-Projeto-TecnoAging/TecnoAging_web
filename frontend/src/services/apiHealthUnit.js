import API_URL from './api';

export const api = {
    async createHealthUnit(dados) {
        try {
            const response = await fetch(`${API_URL}/healthUnit`, {
                method: 'POST',
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
            console.error('Erro ao criar HealthUnit:', error);
            throw error;
        }
    },

    async getHealthUnits() {
        try {
            const response = await fetch(`${API_URL}/healthUnit`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar HealthUnits:', error);
            throw error;
        }
    },

    async getHealthUnitById(id) {
        try {
            const response = await fetch(`${API_URL}/healthUnit/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar HealthUnit com id ${id}:`, error);
            throw error;
        }
    },

    async updateHealthUnit(id, dados) {
        try {
            const response = await fetch(`${API_URL}/healthUnit/${id}`, {
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
            console.error(`Erro ao atualizar HealthUnit com id ${id}:`, error);
            throw error;
        }
    },

    async deleteHealthUnit(id) {
        try {
            const response = await fetch(`${API_URL}/healthUnit/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }
            return { message: 'HealthUnit deletada com sucesso' };
        } catch (error) {
            console.error(`Erro ao deletar HealthUnit com id ${id}:`, error);
            throw error;
        }
    },
};
