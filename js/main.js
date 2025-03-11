import ui  from "./ui.js"
import api from "./api.js"


const regexConteudo = /^[A-Za-z\s@#$%&*!]{4,}$/
const regexAutoria = /^[A-Za-z\s@#$%&*!]{2,30}$/

const pensamentoSet = new Set()

async function adicionarChavePensamento() {
    try {
        const pensamentos = await api.buscarPensamentos()
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
            pensamentoSet.add(chavePensamento)
        })
    } catch (error) {
        alert("Erro ao adicionar chave ao pensamentos")
        
    }
    
}



function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '')
  }


function validarConteudo(conteudo){
    return regexConteudo.test(conteudo)
}

function validarAutoria(autoria){
    return regexAutoria.test(autoria)
}

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()
    adicionarChavePensamento()

    const fomularioPensamento = document.getElementById('pensamento-form')
    const btnCancelar = document.getElementById('botao-cancelar')
    const campoBusca = document.getElementById("campoDeBusca")
    
    fomularioPensamento.addEventListener('submit', manupilarSubmissaoFormulario)
    btnCancelar.addEventListener('click', limparFormulario)
    campoBusca.addEventListener('input', manipularBusca)
})

async function manupilarSubmissaoFormulario(event){
    event.preventDefault()

    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value
    const data = document.getElementById("pensamento-data").value


    const conteudoSemEspacos = removerEspacos(conteudo)
    const autoriaSemEspacos = removerEspacos(autoria)
  

    if(!validarConteudo(conteudoSemEspacos)){
        alert("O pensamento deve ter no mínimo 4 caracteres e alguns caracteres especiais não são permitidos") 
        return
    }

    if(!validarAutoria(autoriaSemEspacos)){
        alert("O autor deve ter no mínimo 2 caracteres e alguns caracteres especiais não são permitidos") 
        return
    }

    if(!validarData(data)){
        alert ("Não é permitido cadastrar uma data futura")
    }


    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

    if(pensamentoSet.has(chaveNovoPensamento)){
        alert("Pensamento já cadastrado")
        return
    }

    try {
        if(id){
            await api.editarPensamento({id, conteudo, autoria , data})
        } else {
            await api.salvarPensamento({conteudo, autoria , data})    
        } 
        ui.renderizarPensamentos()
    } 
    catch {
        alert('Erro ao salvar pensamento')
    }

}

function limparFormulario(){
    document.getElementById("pensamento-form").reset();

}

async function manipularBusca() {
    const termoBusca = document.getElementById("campoDeBusca").value
    try {
      const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
      console.log(pensamentosFiltrados)
      ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
      alert("Erro ao realizar busca")
    }
  }

  function validarData(data){
    const dataAtual = new Date()
    const dataInserida = new Date(data)
    return dataInserida <= dataAtual
  }