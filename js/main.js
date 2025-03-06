import ui  from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()

    const fomularioPensamento = document.getElementById('pensamento-form')
    const btnCancelar = document.getElementById('botao-cancelar')
    
    
    fomularioPensamento.addEventListener('submit', manupilarSubmissaoFormulario)
    btnCancelar.addEventListener('click', limparFormulario)
})

async function manupilarSubmissaoFormulario(event){
    event.preventDefault()

    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    try {
        if(id){
            await api.editarPensamento({id, conteudo, autoria})
        } else {
            await api.salvarPensamento({conteudo, autoria})    
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