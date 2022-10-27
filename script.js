let promise;
let statusReturned;
let trocaFundo;
function login() {
    const nameUser = prompt("Qual seu nome?")
    let userValue = { name: nameUser }
    let user = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userValue)
    user.then(loginOk)
    user.catch(errorLogin)
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
}
let backGround;
function incomeMessages(messages) {
    messageContent = messages.data
    for (i = 0; i < messageContent.length; i++) {
        chat1 = document.querySelector(".chatoul");
        if (messageContent[i].type !== "status") {
            chat1.innerHTML += `<li class="msgs"> <div class="content">
    <span class="time"> (${messageContent[i].time}) </span>
    <span class="nome"> ${messageContent[i].from} para ${messageContent[i].to} :</span>
    <span class="text"> ${messageContent[i].text}  </span></div> </li>`
        } else {
            chat1.innerHTML += `<li class="msgs"> <div class="content">
    <span class="time"> (${messageContent[i].time}) </span>
    <span class="nome"> ${messageContent[i].from}:</span>
    <span class="text"> ${messageContent[i].text}  </span></div> </li>`


        }

        lastTxt();
    } changeBackground(messageContent);
    // setTimeout(getMessages, 3000)
}
function changeBackground(data) {
    trocaFundo = Array.from(document.querySelectorAll(".msgs"))
    for (i = 0; i < data.length; i++) {
        if (data[i].type == "status") {
            trocaFundo[i].classList.add("login")
        }
        else if (data[i].type == "private_message") {
            trocaFundo[i].classList.add("priveteMessage")
        }
    }
}
function lastTxt() {
    lastMessage = Array.from(document.querySelectorAll(".text"))
    lastMessage = lastMessage[lastMessage.length - 1]
    lastMessage.scrollIntoView();
}