import { wsAddUserToRoom } from '../../types/wsRequest';
import { dataBase } from '../../dataBase/db';
import { wsAction } from '../../types/wsAction';

export const addUserToRoom: wsAction = (message, client, sessionId) => {
  const recivedMessage = message as wsAddUserToRoom;
  const userToAdd = dataBase.users.users.find(
    (user) => user.sessionId === sessionId,
  );
  if (userToAdd)
    dataBase.rooms.addUserToRoom(userToAdd, recivedMessage.data.indexRoom);
};
