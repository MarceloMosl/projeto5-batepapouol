let promise;
function getMessages(){
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

    promise.then(incomeMessages)


}
function sidebar(){
    testando = document.querySelector(".escondido")
    testando.classList.toggle ("sidebar")
}
function incomeMessages(messages){
    messageContent = messages.data
    for(i=0;i<messageContent.length;i++){
    chat1 = document.querySelector(".chatoul");
    chat1.innerHTML += ` <li class="msgs"> 
    <span class="time"> ${messageContent[i].time} </span>
    <span class="nome"> ${messageContent[i].from}  </span>
    <span class="text"> ${messageContent[i].text}  </span>
    
</li>`}
const chatScroll = document.querySelector("li")
chatScroll.scrollIntoView();

// setTimeout(getMessages, 3000)
    }
