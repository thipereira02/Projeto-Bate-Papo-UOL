let user = "";

function login(){
    user = document.querySelector(".name").value;
    const data = {
        name: user
    };
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);
    console.log(promise)
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

function loadingPage(response){
    const element = document.querySelector(".login") 
    element.classList.add("hidden");
    setTimeout(chatPage, 3000);
}

function chatPage(){
    const element = document.querySelector(".loading")
    element.classList.add("hidden");
    setInterval(update,5000);    
}

function update(){
    const data = {
        name: user
    };
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", data);
    console.log(promise)
}










function activeParticipants(){
    const element = document.querySelector("aside");
    console.log(element)
    element.classList.remove("hidden")
}