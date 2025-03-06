import api from "./api.js"

const ui = {
    async renderizarPensamentos(pensamentos){
        const listaPensamentos = document.getElementById('lista-pensamentos')
        const semPensamentos = document.getElementById('sem-pensamentos')
        listaPensamentos.innerHTML = ''

        try {
            const pensamentos = await api.buscarPensamentos()
            if(pensamentos.length === 0){
                semPensamentos.style.display = 'block'
            }else{
                semPensamentos.style.display = 'none'
                pensamentos.forEach(ui.adicionarPensamento)
            }
        }
        catch (error) {
            alert('Erro ao buscar pensamentos')
        }
    },

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId)
        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria
      },

    adicionarPensamento(pensamento){
        const listaPensamentos = document.getElementById('lista-pensamentos')
        const li = document.createElement('li')
        li.setAttribute("data-id", pensamento.id)
        li.classList.add('li-pensamento') 

        const iconeAspas = document.createElement('img')
        iconeAspas.src = "assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add('icone-aspas')

        const pensamentoConteudo = document.createElement('div')
        pensamentoConteudo.classList.add('pensamento-conteudo')
        pensamentoConteudo.textContent = pensamento.conteudo

        const pensamentoAutoria = document.createElement ('div')
        pensamentoAutoria.classList.add ("pensamento-autoria")
        pensamentoAutoria.textContent = pensamento.autoria

        const btnEditar = document.createElement('button')
        btnEditar.classList.add('botao-editar')
        btnEditar.onclick = () => ui.preencherFormulario(pensamento.id)

        const iconeEditar = document.createElement('img')
        iconeEditar.src = "assets/imagens/icone-editar.png"
        iconeEditar.alt = "Editar"
        btnEditar.appendChild(iconeEditar)
        
        
        const btnExcluir = document.createElement('button')
        btnExcluir.classList.add('botao-excluir')
        btnExcluir.onclick =  async () =>{
            try {
                await api.apagarPensamento(pensamento.id)
                ui.renderizarPensamentos()
            } catch (error) {
                alert('Erro ao excluir pensamento')
            }
        }

        const iconeExcluir = document.createElement('img')
        iconeExcluir.src = "assets/imagens/icone-excluir.png"
        iconeExcluir.alt = "Excluir"
        btnExcluir.appendChild(iconeExcluir)

        const icones = document.createElement('div')
        icones.classList.add('icones')
        icones.appendChild(btnEditar)
        icones.appendChild(btnExcluir)




        li.appendChild(iconeAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(icones);
        listaPensamentos.appendChild(li)
    },

    
    
}




export default ui