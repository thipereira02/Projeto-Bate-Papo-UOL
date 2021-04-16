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
    getParticipantsList();
}

function getParticipantsList(){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
    promise.then(loadParticipants);
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
    renderMessages();  
}

function renderMessages(){
    const oldChat = document.querySelector("main");
    oldChat.innerHTML = "";

    for (let i=0; i<chat.length; i++){
        if (chat[i].type === "status"){
            oldChat.innerHTML += `
                <div class="status">
                    <p> <span class="time">(${chat[i].time})&nbsp;</span> <span><strong>${chat[i].from}</strong></span> <span>${chat[i].text}</span> </p>
                </div>
            `;
        } else if (chat[i].type === "message"){
            oldChat.innerHTML += `
                <div class="message">
                    <p> <span class="time">(${chat[i].time})&nbsp;</span> <span><strong>${chat[i].from}</strong> para <strong>${chat[i].to}</strong>: </span> <span>${chat[i].text}</span> </p>
                </div>
            `;  
        } else if (chat[i].type === "private_message"){
            if (chat[i].to === user){
                oldChat.innerHTML += `
                    <div class="private_message">
                        <p> <span class="time">(${chat[i].time})&nbsp;</span> <span><strong>${chat[i].from}</strong> reservadamente para <strong>${chat[i].to}</strong>: </span> <span>${chat[i].text}</span> </p>
                    </div>
                `;
            }    
        }
    };

    const last = document.querySelector("main div:last-child");
    last.scrollIntoView();
}

function sendMessage(){
    const text = document.querySelector(".communication").value;
    const data = {
        from: user,
        to: "Todos",
        text: text,
        type: "message"
    };
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", data);
    promise.catch(window.location.reload);
    document.querySelector(".communication").value = null;
}

function enterSendMessage(element){
    element.addEventListener('keyup', function(e){
        const key = e.which || e.keyCode;
        if (key == 13){
            sendMessage();
        }   
    });
}

function activeParticipants(){
    const element = document.querySelector("aside");
    console.log(element)
    element.classList.remove("hidden")
}

function loadParticipants(response){
    participants = response.data;
    const list = document.querySelector(".participants");
    list.innerHTML = "";

    for (let i=0; i<participants.length; i++){
        list.innerHTML += `
        <div class="contact">
            <div class="option">
                <ion-icon class="sidebarIcon" name="person-circle"></ion-icon>
                <p>${participants[i].name}</p>
            </div>
            <div>
                <ion-icon class="checkIcon" name="checkmark"></ion-icon>
            </div>
        </div>        
        `;
    }

    setInterval(getParticipantsList,10000);
}