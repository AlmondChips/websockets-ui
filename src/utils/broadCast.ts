import { wsAction } from 'types/wsAction';
import { ws as wsServer } from '../index';
import ws from 'ws';
import { sendMessage } from './ws.utils';
import { wsResponse } from 'types/wsResponse';

export const broadCast = <T extends wsResponse>(
  data: T,
  specificClients?: ws.WebSocket[],
) => {
  let clients: ws.WebSocket[] | Set<ws> = wsServer.clients;
  if (specificClients) {
    clients = specificClients;
  }
  clients.forEach((client) => sendMessage(data, client));
};
