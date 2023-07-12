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
}
