import io from 'socket.io-client';
let socket;

export const initiateSocket = room => {
  socket = io('http://192.168.0.104:5000');
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('chat massage', room);
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};
export const subscribeToChat = cb => {
  if (!socket) return true;
  socket.on('chat massage', msg => {
    console.log(msg, 'mmmmmmmmm');
    console.log('Websocket event received!');
    return cb(null, msg);
  });
};

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', {message, room});
};
