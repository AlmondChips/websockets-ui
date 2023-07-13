import { wsMessage } from './wsRequest';
import * as ws from 'ws';

export type wsAction = (
  recivedMessage: wsMessage,
  wsClient: ws.WebSocket,
  sessionId?: number,
) => void;
