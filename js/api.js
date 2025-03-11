
const URL = 'http://localhost:3000';

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-")
    return new Date(Date.UTC(ano, mes - 1, dia))
  }

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL}/pensamentos`);
           const pensamentos = await response.data;

           return pensamentos.map(pensamento =>{
            return{
            ...pensamento,
            data: new Date(pensamento.data)
            }
        })
        } catch (error)  {
            alert('Erro ao buscar pensamentos');
            throw error
        }
    },

    async salvarPensamento(pensamento) {
        try {
          const data = converterStringParaData(pensamento.data)
    
          const response = await axios.post(`${URL}/pensamentos`, {
            ...pensamento,
            data: data.toISOString()
          })
          return await response.data
        }
        catch {
          alert('Erro ao salvar pensamento')
          throw error
        }
      },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL}/pensamentos/${id}`);
            const pensamento =  await response.data;

            return{
                ...pensamento,
                data: new Date(pensamento.data)
            }

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

    async buscarPensamentoPorTermo(termo){
        try {
            const pensamentos = await this.buscarPensamentos()
            const termoEmMinusculas = termo.toLowerCase()

            const pensamentoFiltrados = pensamentos.filter(pensamentos =>{
                return (pensamentos.conteudo.toLowerCase().includes(termoEmMinusculas)) || pensamentos.autoria.toLowerCase().includes(termoEmMinusculas)
            })
            return pensamentoFiltrados
        } catch (error) {
            alert ("erro ao filtrar pensamentos")
            throw error
        }
    },

    async atualizarFavorito(id,favorito){
        try {
            const response = await axios.patch(`${URL}/pensamentos/${id}`, {favorito})
            return response.data
        } catch (error) {
            alert("Erro ao atualizar favorito")
            throw error
        }

    }

}

export default api