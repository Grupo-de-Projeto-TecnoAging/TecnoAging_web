import API_URL from './api';

export const api = {
    async getEvaluations(params) {
        try {
            const response = await fetch(`${API_URL}/evaluation`, {
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

    async getSensorData(evaluationId) {
        try {
            const response = await fetch(`${API_URL}/dado-sensor/evaluation/${evaluationId}`, {
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
            console.error('Erro ao obter dados do sensor:', error);
            throw error;
        }
    },

    async getEvaluationDetails(evaluationId) {
        try {
            const response = await fetch(`${API_URL}/evaluation/details/${evaluationId}`, {
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
            console.error('Erro ao buscar detalhes da avaliação:', error);
            throw error;
        }
    },

    async getEvaluationsByPersonCpf(cpf) {
        try {
            const response = await fetch(`${API_URL}/evaluation/person/${cpf}`, {
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
            console.error('Erro ao buscar avaliações por CPF:', error);
            throw error;
        }
    }
    
}