/**
 * Composant pour créer et ajouter un message au chat.
 *
 * @param params - Les paramètres du message.
 * @param params.userId - L'ID de l'utilisateur émetteur.
 * @param params.username - Le nom de l'utilisateur émetteur.
 * @param params.message - Le contenu du message.
 * @param params.isCurrentUser - Indique si le message provient de l'utilisateur actuel.
 * @param params.timestamp - Le timestamp du message.
 * @param container - L'élément UL où ajouter le message.
 */
export function chatBubble(
  params: {
    userId: string;
    username: string;
    message: string;
    isCurrentUser: boolean;
    timestamp: string;
  },
  container: HTMLUListElement
): void {
  const { username, message, isCurrentUser, timestamp } = params;

  // Création de l'élément <li> pour le message
  const item = document.createElement("li");

  // Définir le contenu HTML du message
  item.innerHTML = `
    <strong>${username}:</strong> ${message}
    <br/>
    <i>${timestamp}</i>
  `;

  // Ajouter une classe pour le style
  item.classList.add(isCurrentUser ? "sent" : "received");

  // Ajouter l'élément au conteneur
  container.appendChild(item);

  // Défilement automatique vers le bas
  container.scrollTo(0, container.scrollHeight);
}
