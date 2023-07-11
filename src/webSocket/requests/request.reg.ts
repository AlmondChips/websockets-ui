import { sendMessage } from '../../utils/ws.utils';
import { dataBase } from '../../dataBase/db';
import { wsAction } from '../../types/wsAction';
import { wsReg } from '../../types/wsRequest';
import { wsResponse } from '../../types/wsResponse';
import { User } from '../../dataBase/users';

export const actionReg: wsAction = (recivedMessage, wsClient, sessionId) => {
  const { name, password } = (recivedMessage as wsReg).data;
  console.log('It is reg, with id:', sessionId);

  if (!sessionId) return;
  const newUser: User = {
    name,
    password,
    wins: 0,
    sessionId,
    clientObject: wsClient,
  };
  try {
    dataBase.users.addUser(newUser);
  } catch (er) {
    const message: wsResponse = {
      type: 'reg',
      data: {
        name,
        error: true,
        errorText: (er as Error).message,
      },
      id: 0,
    };
    sendMessage(message, wsClient);
    return;
  }

  const message: wsResponse = {
    type: 'reg',
    data: { name, error: false },
    id: 0,
  };
  sendMessage(message, wsClient);
  dataBase.rooms.updateRooms();
};
