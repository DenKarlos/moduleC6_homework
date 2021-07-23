const btnSend = document.querySelector(".j-btn-send");
const btnGeo = document.querySelector(".j-btn-geo");
const inputMessage = document.querySelector(".chat-send-mess");
const chatWindow = document.querySelector(".chat-window");

let websocket;

document.addEventListener("DOMContentLoaded", function () {
    websocket = new WebSocket("wss://echo.websocket.org/");
    websocket.onopen = (evt) => {
        console.log("CONNECTED");
    };
    websocket.onmessage = (evt) => {
        chatWindow.innerHTML += `<div class="chat-message server">${evt.data}</div>`;
    };
    websocket.onerror = function (evt) {
        console.log(`EROR: ${evt.data}`);
    };
});

btnSend.addEventListener("click", () => {
    const message = inputMessage.value;
    if (message) {
        chatWindow.innerHTML += `<div class="chat-message user">${message}</div>`;
        websocket.send(message);
    }
});

const error = () => {
    chatWindow.innerHTML += `<div class="chat-message user" style="color: red;">Невозможно получить ваше местоположение</div>`;
};

const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://www.openstreetmap.org/#map=17/${latitude}/${longitude}`;
    chatWindow.innerHTML += `<div class="chat-message user"><a href="${url}" target="_blank">Гео-локация</a></div>`;
};

btnGeo.addEventListener("click", async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
