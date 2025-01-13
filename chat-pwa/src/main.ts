import { io } from "socket.io-client";

const socket = io();

const form = document.getElementById("form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const messages = document.getElementById("messages") as HTMLUListElement;

// Envoi du message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value); // Émettre le message au serveur
    input.value = ""; // Réinitialiser le champ d'entrée
  }
});

// Réception des messages
socket.on("chat message", (msg: string) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
