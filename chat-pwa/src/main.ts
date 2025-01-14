import { io } from "socket.io-client";

// Si vous êtes en développement, utilisez le port 5173 avec le proxy
const socket = io(import.meta.env.DEV ? "http://localhost:5173" : "/");

// Génération d’un identifiant unique pour l’utilisateur
const userId = Math.random().toString(36).substring(2, 15);

const form = document.getElementById("form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const messages = document.getElementById("messages") as HTMLUListElement;

// Envoi du message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    // Envoi du message avec l’identifiant utilisateur
    socket.emit("chat message", { userId, message: input.value });
    input.value = "";
  }
});

// Réception des messages
socket.on("chat message", (data: { userId: string; message: string }) => {
  const item = document.createElement("li");

  // Ajout d’une classe spécifique pour les messages de l’utilisateur
  if (data.userId === userId) {
    item.classList.add("sent");
  } else {
    item.classList.add("received");
  }

  item.textContent = data.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
