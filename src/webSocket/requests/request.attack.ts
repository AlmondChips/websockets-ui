import { attackData } from '../../types/wsRequest';
import { wsAction } from '../../types/wsAction';
import { dataBase } from '../../dataBase/db';

export const attack: wsAction = (message, _) => {
  dataBase.games.attack(message.data as attackData);
};
