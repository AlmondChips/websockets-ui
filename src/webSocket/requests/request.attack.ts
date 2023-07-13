import { attackData } from '../../types/wsRequest';
import { wsAction } from '../../types/wsAction';
import { dataBase } from '../../dataBase/db';
import { randomizeAttack } from '../../utils/randomizeAttack';
import { Coordinate } from '../../dataBase/games';

export const attack: wsAction = (message, _) => {
  let data: unknown = message.data;
  if (message.type === 'randomAttack') {
    const game = dataBase.games.getGame(message.data.gameId);
    if (!game) return;
    // const attackSender = dataBase.users.getUser(message.data.indexPlayer);
    const attackedPlayer = game.players.find(
      (p) => p.user.sessionId !== message.data.indexPlayer,
    );
    let coords: Coordinate;
    let isUnable;
    do {
      coords = randomizeAttack();
      isUnable = attackedPlayer?.unabledFields?.find(
        (f) => f.x === coords.x && f.y === coords.y,
      );
    } while (isUnable);

    data = { ...message.data, ...coords };
  }
  dataBase.games.attack(data as attackData);
};
