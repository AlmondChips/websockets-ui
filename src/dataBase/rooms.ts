import { wsResponse } from '../types/wsResponse';
import { broadCast } from '../utils/broadCast';
import { dataBase } from './db';
import { User } from './users';

export interface Room {
  id: number;
  players: User[];
}

export class Rooms {
  static roomsCounter = 0;
  static openRooms: Room[] = [];
  static fullRooms: Room[] = [];

  static createRoom(creator: User) {
    const isAlreadyOpenedRoom = this.openRooms.find((room) =>
      room.players.find((p) => p.sessionId === creator.sessionId),
    );
    if (isAlreadyOpenedRoom) {
      console.log(creator.name, 'is Not allowed to open new rooms!');

      return;
    }
    const newRoom: Room = {
      id: this.roomsCounter,
      players: [creator],
    };
    this.openRooms.push(newRoom);
    console.log('Created room with id', newRoom.id);
    this.roomsCounter = ++this.roomsCounter;
  }

  static addUserToRoom(user: User, roomIndex: number) {
    const roomToFill: Room | undefined = this.openRooms.find(
      (room) => room.id === roomIndex,
    );
    if (
      roomToFill &&
      !roomToFill.players.find((p) => p.sessionId === user.sessionId)
    ) {
      console.log(
        `Add user with id=${user.sessionId} to room with index=${roomIndex}`,
      );
      roomToFill.players.push(user);
    }
    if (roomToFill?.players.length === 2) {
      this.fullRooms.push(roomToFill);
      dataBase.games.createGame(roomToFill.players, roomToFill.id);
      roomToFill?.players.forEach((p) => {
        this.openRooms.forEach((room, idx) => {
          if (room.players.find((player) => player.sessionId === p.sessionId)) {
            this.openRooms.splice(idx, 1);
          }
        });
      });

      this.updateRooms();
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
