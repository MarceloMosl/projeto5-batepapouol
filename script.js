let promise, statusReturned, trocaFundo, backGround, userValue, documento, usersNames, iconClicked;
let usuarioClicado = "Todos";
let toWhom = "message";
let voltar = document.querySelector(".escondido");
let checkGreen = document.querySelector(".icon-check")
function sendToAll() {
    usuarioClicado = "Todos"
}
function login() {
    const nameUser = prompt("Qual seu nome?")
    userValue = { name: nameUser }
    let user = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userValue)
    user.then(loginOk)
    user.catch(errorLogin)
    setTimeout(ativo, 1000)
    setInterval(ativo, 5000);
} login();
function errorLogin(errorResponse) {
    alert("Usuario sendo utilizado no momento, escolha outro!")
    login();
}
function loginOk(response) {
    getMessages();
}
function getMessages() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(incomeMessages)
}
function sidebar() {
    sidebarView = document.querySelector(".escondido")
    sidebarView.classList.toggle("sidebar")
    getParticipants();
}
function incomeMessages(messages) {
    messageContent = messages.data
    chat1 = document.querySelector(".chatoul");
    chat1.innerHTML = ""
    for (i = 0; i < messageContent.length; i++) {
        if (messageContent[i].type === "message" || messageContent[i].type === "private_message" && messageContent[i].to === userValue.name || messageContent[i].type === "private_message" && messageContent[i].from === userValue.name){
            if(messageContent[i].type === "private_message"){
                chat1.innerHTML += `<li class="msgs priveteMessage"> <div class="content">
            <span class="time"> (${messageContent[i].time}) </span>
            <span class="nome"> ${messageContent[i].from} reservadamente para ${messageContent[i].to} :</span>
            <span class="text"> ${messageContent[i].text}  </span></div> </li>`

            }else{
                chat1.innerHTML += `<li class="msgs"> <div class="content">
            <span class="time"> (${messageContent[i].time}) </span>
            <span class="nome"> ${messageContent[i].from} para ${messageContent[i].to} :</span>
            <span class="text"> ${messageContent[i].text}  </span></div> </li>`}
        } else if (messageContent[i].type == "status") {
            chat1.innerHTML += `<li class="msgs login"> <div class="content">
            <span class="time"> (${messageContent[i].time}) </span>
            <span class="nome"> ${messageContent[i].from}:</span>
            <span class="text"> ${messageContent[i].text}  </span></div> </li>`
        } else {
        }
        lastTxt();
    }
   setTimeout(getMessages, 3000)
}
function lastTxt() {
    lastMessage = Array.from(document.querySelectorAll(".text"))
    lastMessage = lastMessage[lastMessage.length - 1]
    lastMessage.scrollIntoView();
}
function ativo() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userValue)
    promise.then(ativoStatus)
    promise.catch(erroStatus)
}
function ativoStatus(status) {
    console.log("status: online")
}
function erroStatus(status) {
    console.log("status: offline")
}
function sendMsg() {
    textMsg = document.querySelector(".input")
    sentMsg = { from: userValue.name, to: usuarioClicado, text: textMsg.value, type: toWhom }

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", sentMsg)
    textMsg.value = ""
    usuarioClicado = "Todos"
    promise.then(sentLog)
    promise.catch(errorSend)
}
function sentLog(response) {
    console.log("mensagem enviada")
    getMessages();
}
function errorSend(response) {
    console.log("Erro ao enviar a Mensagem")
    window.location.reload()
}
function getParticipants() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promise.then(displayParticipants)
    promise.catch(errorParticipants)
}
function displayParticipants(response) {
    usersNames = response.data
    participantsHTML = document.querySelector(".users");
    participantsHTML.innerHTML = ""
    for (i = 0; i < usersNames.length; i++) {
        participantsHTML.innerHTML += `
    <div class="options-sidebar" onclick="getUserSide(this)">
        <div class="participants">
            <ion-icon name="person-circle"></ion-icon>
            <p>${usersNames[i].name}</p>
        </div>
        <div class="icon-check">
         <ion-icon name="checkmark"></ion-icon>
        </div>
    </div>`
    }
    setInterval(getParticipants, 10000)
}
function errorParticipants(response) {
    window.location.onload()
}
function getUserSide(element) {
    usuarioClicado = element.children[0]
    usuarioClicado = usuarioClicado.children[1].innerHTML
    userClickedSidebar(element);
}
function userClickedSidebar(clicked) {
    console.log(clicked)
    iconClicked = clicked.children[1]
    iconClicked.children[0].classList.add("back")
}
function sendToAll(){
    toWhom = "message"
    iconClicked2 = element.children[0]
    iconClicked2.classList.add("back")

}
function sendPrivate(){
    toWhom = "private_message"
}
function hideSidebar(){
    voltar.classList.remove("sidebar")   
}