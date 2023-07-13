import { wsResponse } from 'types/wsResponse';
import * as ws from 'ws';
import { wsMessage } from '../types/wsRequest';

const parseMessageWithData = (data: ws.RawData): wsMessage | void => {
  const parsedData = JSON.parse(data.toString());
  const result: wsMessage = {
    ...parsedData,
    data: parsedData.data ? JSON.parse(parsedData.data) : '',
  };
  return result;
};

const sendMessage = (data: wsResponse, client: ws.WebSocket) => {
  if (data.data) {
    const result = { ...data, data: JSON.stringify(data.data) };
    client.send(JSON.stringify(result));
    console.log(`Response: `, data);
  }
};

export { parseMessageWithData, sendMessage };
