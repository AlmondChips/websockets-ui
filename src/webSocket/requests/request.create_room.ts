import { wsAction } from '../../types/wsAction';
import { dataBase } from '../../dataBase/db';

export const createRoom: wsAction = (_, __, sessionId) => {
  const creator = dataBase.users.users.find(
    (user) => user.sessionId === sessionId,
  );
  if (creator) {
    dataBase.rooms.createRoom(creator);
    dataBase.rooms.updateRooms();
  }
};
