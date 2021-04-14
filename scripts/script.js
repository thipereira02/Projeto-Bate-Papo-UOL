let user;

function login(){
    user = document.querySelector(".name").value;
    console.log(user)
    const promise = axios.post("", user);
    promise.then(loadingPage);
    promise.catch(error);
}

function error(){
    user = prompt("Nome não disponível. Por favor, digite outro")
    const promise = axios.post("", user);
    promise.then(loadingPage);
    promise.catch(error);
}

function loadingPage(){
    const element = document.querySelector(".login") 
    element.classList.add("hidden");
    setTimeout(chatPage, 3000);
}

function chatPage(){
    const element = document.querySelector(".loading")
    element.classList.add("hidden");    
}

function activeParticipants(){
    const element = document.querySelector("aside");
    console.log(element)
    element.classList.remove("hidden")
}