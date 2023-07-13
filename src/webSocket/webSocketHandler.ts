import * as ws from 'ws';
import { parseMessageWithData } from '../utils/ws.utils';
import { requests } from './requests/requestList';
import { generateSessionId } from '../utils/sessionIdGen';

export const onConnect = (wsClient: ws.WebSocket) => {
  const sessionId = generateSessionId();
  console.log(`Client with id(${sessionId}) connected.`);

  wsClient.on('message', (data) => {
    const recivedMessage = parseMessageWithData(data);
    if (recivedMessage) {
      const action = requests.get(recivedMessage.type);
      if (action) {
        action(recivedMessage, wsClient, sessionId);
      }
    }
    console.log('Request:', recivedMessage);
  });

  wsClient.on('close', () => {
    console.log(`Client with id(${sessionId}) disconnected.`);
  });
};
