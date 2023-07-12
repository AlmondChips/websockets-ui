import { sendMessage } from '../utils/ws.utils';
import { dataBase } from './db';
import { User } from './users';
import * as ws from 'ws';
import { wsResponse } from '../types/wsResponse';
import { broadCast } from '../utils/broadCast';

export interface Room {
  id: number;
  players: User[];
}

export class Rooms {
  static roomsCounter = 0;
  static openRooms: Room[] = [];
  static fullRooms: Room[] = [];

  static createRoom(creator: User) {
    const newRoom: Room = {
      id: this.roomsCounter,
      players: [creator],
    };
    this.openRooms.push(newRoom);
    console.log('Created room with id', newRoom.id, this.roomsCounter);
    console.log(`Rooms`, this.openRooms);
    this.roomsCounter = ++this.roomsCounter;
  }

  static addUserToRoom(user: User, roomIndex: number) {
    console.log(`Requested room index: ${roomIndex}`);
    const roomToFill: Room | undefined = this.openRooms[roomIndex];
    if (
      roomToFill &&
      !roomToFill.players.find((p) => p.sessionId === user.sessionId)
    ) {
      roomToFill.players.push(user);
      this.openRooms.splice(roomIndex - 1, 1);
      console.log('Shodnt log');
    }
    console.log(roomToFill?.players);
    if (roomToFill?.players.length === 2) {
      console.log('WTF');

      this.fullRooms.push(roomToFill);
      dataBase.games.createGame(roomToFill.players, roomToFill.id);
    }
  }

  static updateRooms() {
    const response: unknown = {
      type: 'update_room',
      data: this.openRooms.map((room) => ({
        roomId: room.id,
        roomUsers: room.players.map((player) => ({
          name: player.name,
          index: player.sessionId,
        })),
      })),
      id: 0,
    };
    broadCast<wsResponse>(response as wsResponse);
  }
}
