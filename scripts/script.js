let user = "";
let chat = [];

function login(){
    user = document.querySelector(".name").value;
    const data = {
        name: user
    };
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);
    promise.then(loadingPage);
    promise.catch(error);
}

function error(){
    user = prompt("Nome não disponível. Por favor, digite outro");
    const data = {
        name: user
    };
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);
    promise.then(loadingPage);
    promise.catch(error);
}

function loadingPage(){
    const element = document.querySelector(".login"); 
    element.classList.add("hidden");
    setTimeout(chatPage, 4000);
}

function chatPage(){
    const element = document.querySelector(".loading");
    element.classList.add("hidden");
    setInterval(signal,5000);
    setInterval(refresh,3000);
}

function signal(){
    const data = {
        name: user
    };
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", data);
}

function refresh(){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promise.then(searchPreviousMessages);
}

function searchPreviousMessages(response){
    chat = response.data;
    console.log(chat);
    const oldChat = document.querySelector("main");

    for (let i=0; i<chat.length; i++){
        if (chat[i].type === "status"){
            oldChat.innerHTML += `
                <div class="status">
                    <p> <span class="time">(${chat[i].time})&nbsp;</span> <span><strong>${chat[i].from}</strong></span> <span>${chat[i].text}</span> </p>
                </div>
            `;
        } else{
            oldChat.innerHTML += `
                <div class="${chat[i].type}">
                    <p> <span class="time">(${chat[i].time})&nbsp;</span> <span><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: </span> <span>${chat[i].text}</span> </p>
                </div>
            `;  
        } 
    };
}











function activeParticipants(){
    const element = document.querySelector("aside");
    console.log(element)
    element.classList.remove("hidden")
}