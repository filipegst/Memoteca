
const URL = 'http://localhost:3000';

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL}/pensamentos`);
            return await response.data;
        } catch (error)  {
            alert('Erro ao buscar pensamentos');
            throw error
        }
    },
    async salvarPensamento (pensamento) {
        try {
            const response = await axios.post(`${URL}/pensamentos`, pensamento)
            return await response.data;

        } catch (error) {
            alert('Erro ao salvar pensamentos');
            throw error
        }
    },
    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL}/pensamentos/${id}`);
            return await response.data;
        } catch (error) {
            alert('Erro ao buscar pensamento');
            throw error
        }
    },

    async editarPensamento (pensamento) {
        try {
            const response = await axios.put(`${URL}/pensamentos/${id}`, pensamento)
            return await response.data

        } catch (error)  {
            alert('Erro ao editar pensamentos');
            throw error
        }
    },

    async apagarPensamento (id) {
        try {
            const response = await axios.delete(`${URL}/pensamentos/${id}`)
        } catch (error) {
            alert('Erro ao excluir pensamentos');
            throw error
        }
    },
}

export default api