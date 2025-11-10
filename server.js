import { WebSocketServer } from 'ws';
import { getAnimalGenerator } from './randomAnimal.js';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const connections = [];

wss.on('connection', (ws) => {
  console.log('New client connected');

  // start generating animals and store the connection
  let generator = getAnimalGenerator(ws);
  generator.start();
  connections.push({ ws, generator });

  ws.on('close', () => {
    // find and remove the connection, stop the generator
    let index = connections.findIndex(c => c.ws === ws);
    if (index !== -1) {
      connections[index].generator.stop();
      connections.splice(index, 1);
    }
    console.log(`Client disconnected, ${connections.length} connections left.`);
  });

  ws.on('error', (e) => {
    console.error(e);
  });

});
