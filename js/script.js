let paginaAtual = 1
HTMLCollection.prototype.forEachCollection = function (callback){
    const tamanho = this.length
    for (let i = 0; i < tamanho; i++){
        callback(this.item(i))
    }
}

function proximaPagina(){
    const currentPage = document.getElementById(`step${paginaAtual}`)
    if (paginaAtual === 1){
        if (validarCampo()){
            currentPage.style.display = 'none'
            document.getElementById(`step${paginaAtual + 1}`).style.display = 'block'
            document.getElementsByClassName('stepNumber').item(paginaAtual - 1).classList.remove('active')
            document.getElementsByClassName('stepNumber').item(paginaAtual).classList.add('active')
            paginaAtual++
        }
        
    }
}

function validarCampo(){
    const inputs = document.getElementsByClassName("inputTypeText")
    let validate = true
    inputs.forEachCollection(element => {
        if (element.getAttribute('type') === 'email'){
            const text = element.value
            if (!text.includes("@") && !text.includes('.com')) {
                validate = false; 
                element.classList.add('erro')
            }
        }
        else if (element.getAttribute('type') === 'text' && element.value === "") {
            validate = false; 
            element.classList.add('erro'); 
        }
        else if (element.getAttribute('type') === 'tel' && element.value === "") {
            validate = false; 
            element.classList.add('erro'); 
        }
    })
    return validate
}

function removerErroColor(index){
    const inputWithError = document.getElementsByClassName("inputTypeText").item(index)
    if (inputWithError.classList.contains('erro')){
        inputWithError.classList.remove('erro')
    }
}

function changePlan(){
    const yearly = document.getElementById('yearly')
    const monthly = document.getElementById('monthly')
    if (monthly.checked){
        yearly.click()
        console.log("yearly selected")
    }
    else{
        monthly.click()
        console.log("monthly selected")

    }
}