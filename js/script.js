let paginaAtual = 1
let monthlyPlan = true
let addons = [false, false, false] 
let opSelected = 0
const addonsTeste = {
    0: {
        name : 'Online service',
        active: false
    },
    1: {
        name : 'Larger storage',
        active: false
    },
    2: {
        name: 'customizableProfile',
        active: false
    }

}
HTMLCollection.prototype.forEachCollection = function (callback){
    const tamanho = this.length
    for (let i = 0; i < tamanho; i++){
        callback(this.item(i), i)
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
            document.getElementById('goBack').style.visibility = 'visible'
            paginaAtual++
        }   
    }
    else if (paginaAtual === 2){
        const addonsPrice = [1, 2, 2]
        const inputs = document.getElementsByName("planSelecet")
        if (!inputs[0].checked && !inputs[1].checked && !inputs[2].checked){
            return
        }
        inputs.forEach((element, index)=>{
            if (element.checked){
                opSelected = index
            }
        })
        currentPage.style.display = 'none';
        if (monthlyPlan){
            document.getElementsByClassName('priceAddons').forEachCollection((element, index)=>{
                element.innerText = `$${addonsPrice[index]}/mo`
            })
        }
        else {
            document.getElementsByClassName('priceAddons').forEachCollection((element, index)=>{
                element.innerText = `$${addonsPrice[index] * 10}/yr`
            })
        }
        document.getElementById(`step${paginaAtual + 1}`).style.display = 'block';
        document.getElementsByClassName('stepNumber').item(paginaAtual - 1).classList.remove('active')
        document.getElementsByClassName('stepNumber').item(paginaAtual).classList.add('active')
        paginaAtual++
    }
    else if (paginaAtual === 3){
        const checkboxs = document.querySelectorAll('input[type="checkbox"]').forEach((element, index)=>{
            if (element.checked) addonsTeste[index].active = true
        })
        currentPage.style.display = 'none'
        document.getElementById(`step${paginaAtual + 1}`).style.display = 'block'
        document.getElementsByClassName('stepNumber').item(paginaAtual - 1).classList.remove('active')
        document.getElementsByClassName('stepNumber').item(paginaAtual).classList.add('active')
        const nextOrConfirmButton = document.getElementById('next')
        nextOrConfirmButton.innerText = "Confirm"
        paginaAtual++
    }
}
function voltarPage(){
    const currentPage = document.getElementById(`step${paginaAtual}`)
    if (paginaAtual > 1){
        currentPage.style.display = 'none'
        document.getElementById(`step${paginaAtual - 1}`).style.display = 'block'
        paginaAtual--
    }
    if (paginaAtual === 1){
        document.getElementById('goBack').style.visibility = 'hidden'
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
    const price = [9, 12, 15]
    const yearly = document.getElementById('yearly')
    const monthly = document.getElementById('monthly')
    if (monthly.checked){
        yearly.click()
        document.getElementsByClassName('price').forEachCollection((element, index)=>{
            element.innerText = `$${price[index] * 10}/yr`
        })
        monthlyPlan = false
    }
    else{
        monthly.click()
        document.getElementsByClassName('price').forEachCollection((element, index)=>{
            element.innerText = `$${price[index]}/mo`
        })
        monthlyPlan = true
    }
    
}