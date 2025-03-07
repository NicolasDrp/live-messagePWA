import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Configuration pour obtenir le répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "dist")));

io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  socket.on("chat message", (data) => {
    console.log(`Message de ${data.username} : ${data.message}`);
    io.emit("chat message", data); // Diffuser le message avec l’userId
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
