import dotenv from "dotenv";
import { WebSocketServer } from 'ws';
import https from 'https';
import { getAnimalGenerator } from './randomAnimal.js';

dotenv.config();

const credentials = {
  key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  cert: process.env.CERTIFICATE.replace(/\\n/g, '\n')
};

const httpsServer = https.createServer(credentials);

const wss = new WebSocketServer({ server: httpsServer });

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
