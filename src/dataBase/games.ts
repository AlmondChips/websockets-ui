import { wsResponse } from '../types/wsResponse';
import { User } from './users';
import { broadCast } from '../utils/broadCast';
import { wsAddShip } from '../types/wsRequest';
import * as ws from 'ws';
import { sendMessage } from '../utils/ws.utils';

type Ship = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

type Game = {
  idGame: number;
  players: [
    {
      user: User;
      ships?: Ship[];
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

  static addShips(message: wsAddShip, client: ws.WebSocket) {
    console.log(`Ships objects before adding:`, this.games);

    const activeGame = this.games.find(
      (game) => game.idGame === message.data.gameId,
    );
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
    const currentGame = this.games.find(
      (game) => game.idGame === message.data.gameId,
    );
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
      });
    }

    console.log('Started the game');
  }
}
