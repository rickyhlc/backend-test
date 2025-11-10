import WebSocket, { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('error', console.error);

  ws.on('open', () => {
    console.log('Client connected');
    ws.send(Date.now());
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // ws.on('message', function message(data, isBinary) {
  //   wss.clients.forEach(function each(client) {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(data, { binary: isBinary });
  //     }
  //   });
  // });
});