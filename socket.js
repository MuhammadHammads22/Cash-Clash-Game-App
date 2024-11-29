// socket.js
import io from 'socket.io-client';

// Replace with your server's URL
const SOCKET_URL = 'http://YOUR_SERVER_IP:4000';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

export default socket;
