import { wsResponse } from '../types/wsResponse';
import { broadCast } from '../utils/broadCast';
import ws from 'ws';
export interface User {
  name: string;
  password: string;
  wins: number;
  sessionId: number;
  clientObject: ws.WebSocket;
  isMyTurn?: boolean;
}

export class Users {
  static users: User[] = [];

  static getUser(userId: number) {
    return this.users.find((user) => user.sessionId === userId);
  }

  static addUser(newUser: User) {
    console.log(`Add User with sessionId=${newUser.sessionId}`);

    const isNotUnique = this.users.find((user) => user.name === newUser.name);
    if (isNotUnique) {
      throw Error('User already exists!');
    }
    this.users.push(newUser);
  }

  static setWinner(winner: User) {
    winner.wins++;
  }

  static updateWinners() {
    const response: unknown = {
      type: 'update_winners',
      data: this.users
        .map((user) => {
          return { name: user.name, wins: user.wins };
        })
        .sort((a, b) => b.wins - a.wins),
      id: 0,
    };

    broadCast(response as wsResponse);
  }
}
