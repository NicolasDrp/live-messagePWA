import { io } from "socket.io-client";

// Si vous êtes en développement, utilisez le port 5173 avec le proxy
const socket = io(import.meta.env.DEV ? "http://localhost:5173" : "/");

// Génération d’un identifiant unique pour l’utilisateur
const userId = Math.random().toString(36).substring(2, 15);

// Heure de l'envoie du message
const timestamp = new Date().toLocaleTimeString();

const form = document.getElementById("form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const messages = document.getElementById("messages") as HTMLUListElement;

// Création d'une zone pour afficher le nom de l'utilisateur
const userDisplay = document.createElement("div");
userDisplay.id = "user-display";
userDisplay.innerHTML = `
  <span class="user-icon">👤</span>
  <span id="username-placeholder">Cliquez ici pour choisir un nom</span>
`;
document.body.appendChild(userDisplay);

// Gestion du nom d'utilisateur
let username: string | null = null;

// Ajout d'un gestionnaire de clic sur l'affichage du nom
userDisplay.addEventListener("click", () => {
  const name = prompt("Choisissez un nom pour le chat :")?.trim();
  if (name) {
    username = name;
    document.getElementById("username-placeholder")!.textContent = username;
    input.disabled = false; // Activer l'entrée du chat
  }
});

// Désactiver l'entrée tant qu'un nom n'est pas choisi
input.disabled = true;

// Envoi du message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && username) {
    // Envoi du message avec le nom d'utilisateur
    socket.emit("chat message", { userId, username, message: input.value });
    input.value = "";
  }
});

// Réception des messages
socket.on(
  "chat message",
  (data: { userId: string; username: string; message: string }) => {
    const item = document.createElement("li");

    // Ajout du nom de l'utilisateur avant le message
    item.innerHTML = `<strong>${data.username}:</strong> ${data.message} <br/> <i>${timestamp}</i>`;
    // Ajout d’une classe spécifique pour les messages de l’utilisateur
    if (data.userId === userId) {
      item.classList.add("sent");
    } else {
      item.classList.add("received");
    }

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
);
