import { wsResponse } from '../types/wsResponse';
import { User } from './users';
import { broadCast } from '../utils/broadCast';
import { wsAddShip, attackData } from '../types/wsRequest';
import * as ws from 'ws';
import { sendMessage } from '../utils/ws.utils';
import { dataBase } from './db';
import { handleShipKill } from './dbUtils/handleShipKill';

// I know it's a too big module but there were no way back

export type Ship = {
  position: {
    x: number;
    y: number;
  };
  hittenParts?: [{ x: number; y: number }];
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export type Coordinate = {
  x: number;
  y: number;
};

type Game = {
  idGame: number;
  players: [
    {
      user: User;
      ships?: Ship[];
      unabledFields?: Coordinate[];
    },
  ];
};

export class Games {
  static games: Game[] = [];

  static createGame(players: User[], gameId: number): void {
    const gameObject: unknown = {
      idGame: gameId,
      players: players.map((user) => ({
        user,
      })),
    };
    this.games.push(gameObject as Game);
    players.forEach((player) => {
      const createGameResponse = {
        type: 'create_game',
        data: {
          idGame: gameId,
          idPlayer: player.sessionId,
        },
        id: 0,
      };
      sendMessage(createGameResponse as wsResponse, player.clientObject);
    });
  }

  static getGame(gameId: number) {
    return this.games.find((game) => game.idGame === gameId);
  }

  static addShips(message: wsAddShip, client: ws.WebSocket) {
    console.log(`Ships objects before adding:`, this.games);

    const activeGame = this.getGame(message.data.gameId);
    activeGame?.players.forEach((player) => {
      if (player.user.sessionId === message.data.indexPlayer) {
        player.ships = [...message.data.ships];
      }
    });

    console.log(`Added ships for id(${message.data.indexPlayer}) player`);
    console.log(`Ships objects after adding:`, this.games);
    if (activeGame) {
      console.log('Checking for ready...');
      const [isFirstReady, isSecondReady] = activeGame.players.map(
        (player) => player.ships !== undefined,
      );
      console.log(isFirstReady, isSecondReady);
      if (isFirstReady && isSecondReady) {
        this.startGame(message);
      }
    }
  }

  static startGame(message: wsAddShip) {
    const currentGame = this.getGame(message.data.gameId);
    if (currentGame) {
      currentGame.players.forEach((player) => {
        const response: unknown = {
          type: 'start_game',
          data: {
            ships: player.ships,
            currentPlayerIndex: player.user.sessionId,
          },
          id: 0,
        };
        console.log(response);
        sendMessage(response as wsResponse, player.user.clientObject);
        this.sendTurn(currentGame.players[0].user, currentGame.idGame);
      });
    }

    console.log('Started the game');
  }

  static sendTurn(whoseTurn: User, gameId: number) {
    const game = this.games.find((game) => game.idGame === gameId);
    const notWhoseTurn = game?.players.find(
      (p) => p.user.sessionId !== whoseTurn.sessionId,
    );
    whoseTurn.isMyTurn = true;
    if (!notWhoseTurn) return;
    notWhoseTurn.user.isMyTurn = false;
    const response: wsResponse = {
      type: 'turn',
      data: {
        currentPlayer: whoseTurn.sessionId,
      },
      id: 0,
    };
    if (game) {
      const clients = game.players.map((player) => player.user.clientObject);
      broadCast(response, clients);
    }
  }

  static attack(attackData: attackData) {
    const attackSender = dataBase.users.getUser(attackData.indexPlayer);
    if (!attackSender?.isMyTurn) return;
    const game = this.getGame(attackData.gameId);
    if (!game) return;
    const attackedPlayer = game.players.find(
      (player) => player.user.sessionId !== attackData.indexPlayer,
    );
    if (!attackedPlayer) return;
    if (!attackedPlayer.unabledFields) {
      attackedPlayer.unabledFields = [];
    }
    const isDoubleClick = attackedPlayer.unabledFields?.find(
      (field) => field.x === attackData.x && field.y === attackData.y,
    );
    if (isDoubleClick) return;
    const response: wsResponse = {
      type: 'attack',
      data: {
        position: {
          x: attackData.x,
          y: attackData.y,
        },
        currentPlayer: attackData.indexPlayer,
      },
      id: 0,
    };
    attackedPlayer.ships?.forEach((ship) => {
      let { x, y } = ship.position;
      const hittableParts = [{ x, y }];
      while (hittableParts.length < ship.length) {
        hittableParts.push(ship.direction ? { x, y: ++y } : { x: ++x, y });
      }
      hittableParts.forEach((hitBox) => {
        if (hitBox.x === attackData.x && hitBox.y === attackData.y) {
          if (!ship.hittenParts) ship.hittenParts = [hitBox];
          else ship.hittenParts?.push(hitBox);
          console.log(ship.hittenParts, ship.length);

          if (ship.hittenParts && ship.hittenParts?.length < ship.length) {
            response.data.status = 'shot';
          } else {
            response.data.status = 'killed';
            handleShipKill(
              hittableParts,
              attackData,
              attackedPlayer,
              attackSender,
            );
          }
          attackedPlayer.unabledFields?.push({
            x: attackData.x,
            y: attackData.y,
          });
          broadCast(
            response,
            game.players.map((p) => p.user.clientObject),
          );

          if (attackSender) {
            this.sendTurn(attackSender, game.idGame);
          }
          console.log(`Registered a hit!`, response);
          return;
        }
      });
    });
    if (response.data.status) return;
    console.log(`Registered a miss!`, response);
    response.data.status = 'miss';
    attackedPlayer.unabledFields?.push({ x: attackData.x, y: attackData.y });
    broadCast(
      response,
      game.players.map((p) => p.user.clientObject),
    );
    this.sendTurn(attackedPlayer.user, game.idGame);
  }
}
