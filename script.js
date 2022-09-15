
document.addEventListener("DOMContentLoaded", ()=>{
    let corrent = 0
    criarBlock__Progress()
    criar_Quiz_Perguntas(corrent)
})
function criarBlock__Progress(){
    let container = document.querySelector(".quiz__progress")

    perguntas.forEach((el)=>{
        container.innerHTML += `<li class="block--alternativa">${el.id}</li>`
    })
    
}

function criar_Quiz_Perguntas(id){
    let container = document.querySelector(".quiz__perguntas")

    let quiz__question = document.createElement("p")
    quiz__question.classList.add("quiz__question")
    container.appendChild(quiz__question)

    let quiz__alternatives = document.createElement("ul")
    quiz__alternatives.classList.add("quiz__alternatives")
    container.appendChild(quiz__alternatives)


    quiz__question.innerText = perguntas[id].question
    addAlternativas(id, quiz__alternatives)
}
function removepergunta(){
    document.querySelector(".quiz__alternatives").remove()
    document.querySelector(".quiz__question").remove()

}
function addAlternativas(current, container){
    perguntas[current].alternativas.forEach((el)=>{
        container.innerHTML += `<li id=${el.al} class="quiz__alt">${el.alternativa}</li>`
    })
    document.querySelectorAll(".quiz__alt").forEach((el)=>{
        el.addEventListener("click", (ev)=>{
            verifyAlternat(ev, current)
        })
    })
}
function verifyAlternat(ev, current){
    let block__alternativa = document.querySelectorAll(".block--alternativa")
    block__alternativa[current].classList.remove("correct", "errado")
    let idclick = Number(ev.target.id)
    if(idclick === perguntas[current].alternativa__Correta){
        block__alternativa[current].classList.add("correct")
        quantity_point()
    }if(idclick !== perguntas[current].alternativa__Correta){
        block__alternativa[current].classList.add("errado")
    }
    attperguntas(current)
}
let pointer = 0
function quantity_point(){
    pointer += 1
}
function attperguntas(current){
    if(current === perguntas.length - 1){
        mostrar_result(current)
    }else{
        current++
        removepergunta()
        criar_Quiz_Perguntas(current)
    }
}
function mostrar_result(current){
    removepergunta()
    criarTela_result(current)

}
function reiniciar(current){
    let block__alternativa = document.querySelectorAll(".block--alternativa")
    block__alternativa.forEach((el)=>{
        el.classList.remove("errado", "correct")
    })
    document.querySelector(".p_result").remove()
    document.querySelector(".btn_result").remove()
    current = 0
    pointer = 0
    criar_Quiz_Perguntas(current)

}
function criarTela_result(current){
    let container = document.querySelector(".tela__result")
    let numberTotalQuests = perguntas.length


    let p = document.createElement("p")
    p.classList.add("p_result")
    p.innerText = "Pontuação "+ pointer + "/" + numberTotalQuests
    container.appendChild(p)

    let button = document.createElement("button")
    button.classList.add("btn_result")
    button.innerHTML = "reiniciar"
    button.addEventListener("click", ()=>{
        reiniciar(current)
    })
    container.appendChild(button)
    // let Pmesage = document.createElement("p")
    // Pmesage.classList.add("p_mensage")
    // container.appendChild(Pmesage)
    // if(pointer < numberTotalQuests/2){
    //     Pmesage.innerText = "Você não sabe muita coisa, continue estudando :)"
    // }if(pointer > numberTotalQuests/2){
    //     Pmesage.innerText = "Você acertou acima da media de alternativas :)"
    // }
}