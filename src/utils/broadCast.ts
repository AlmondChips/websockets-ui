import { wsAction } from 'types/wsAction';
import { ws } from '../index';
import { sendMessage } from './ws.utils';
import { wsResponse } from 'types/wsResponse';

export const broadCast = <T extends wsResponse>(data: T) => {
  ws.clients.forEach((client) => sendMessage(data, client));
};
