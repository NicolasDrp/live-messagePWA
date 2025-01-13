import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000", // Adresse du serveur Node.js
        ws: true, // Active le support WebSocket
      },
    },
  },
});
