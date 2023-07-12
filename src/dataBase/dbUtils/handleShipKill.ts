import { wsResponse } from '../../types/wsResponse';
import { Coordinate, Ship } from '../../dataBase/games';
import { attackData } from '../../types/wsRequest';
import { broadCast } from '../../utils/broadCast';
import { User } from '../../dataBase/users';
export const handleShipKill = (
  hittableParts: Coordinate[],
  attackData: attackData,
  attackedPlayer: {
    user: User;
    ships?: Ship[] | undefined;
    unabledFields?: Coordinate[] | undefined;
  },
  attackSender: User,
) => {
  const unabledFields: Coordinate[] = [];
  const offsets = [-1, 0, 1];

  hittableParts.forEach((part) => {
    const { x, y } = part;

    offsets.forEach((offsetX) => {
      offsets.forEach((offsetY) => {
        if (offsetX !== 0 || offsetY !== 0) {
          unabledFields.push({ x: x + offsetX, y: y + offsetY });
        }
      });
    });
  });

  const result = unabledFields.filter(
    (item) =>
      !hittableParts.find((part) => part.x === item.x && part.y === item.y),
  );

  const players = [attackedPlayer.user, attackSender];
  attackedPlayer.unabledFields?.push(...result);
  result.forEach((cooridnate) => {
    const response: wsResponse = {
      type: 'attack',
      data: {
        position: {
          x: cooridnate.x,
          y: cooridnate.y,
        },
        currentPlayer: attackData.indexPlayer,
      },
      id: 0,
    };

    broadCast(
      response,
      players.map((p) => p.clientObject),
    );
  });
};
