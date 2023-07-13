import { wsAddShip } from 'types/wsRequest';
import { wsAction } from '../../types/wsAction';
import { dataBase } from '../../dataBase/db';
export const addShips: wsAction = (message) => {
  const recivedMessage = message as wsAddShip;
  dataBase.games.addShips(recivedMessage);
};
