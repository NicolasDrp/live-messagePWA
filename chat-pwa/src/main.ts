import { io } from "socket.io-client";

// Si vous êtes en développement, utilisez le port 5173 avec le proxy
const socket = io(import.meta.env.DEV ? "http://localhost:5173" : "/");

const form = document.getElementById("form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const messages = document.getElementById("messages") as HTMLUListElement;

// Envoi du message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

// Réception des messages
socket.on("chat message", (msg: string) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
