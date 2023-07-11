import { onConnect } from './webSocket/webSocketHandler';
import { httpServer } from './http_server/index';
import { WebSocketServer } from 'ws';
const PORT = 8181;
const wsPort = 3000;

export const ws = new WebSocketServer({ port: wsPort }, () => {
  console.log('WebSocket server started on port', wsPort);
});

ws.on('connection', onConnect);

console.log(`Start static http server on the ${PORT} port!`);
httpServer.listen(PORT);
