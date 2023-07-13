export type wsMessage =
  | wsReg
  | wsCreateRoom
  | wsAddUserToRoom
  | wsAddShip
  | wsAttack
  | wsRandomAttack;

export type wsReg = {
  type: 'reg';
  data: {
    name: string;
    password: string;
  };
  id: 0;
};

export type wsCreateRoom = {
  type: 'create_room';
  data: '';
  id: 0;
};

export type wsAddUserToRoom = {
  type: 'add_user_to_room';
  data: {
    indexRoom: number;
  };
  id: 0;
};

export type wsAddShip = {
  type: 'add_ships';
  data: {
    gameId: number;
    ships: [
      {
        position: {
          x: number;
          y: number;
        };
        direction: boolean;
        length: number;
        type: 'small' | 'medium' | 'large' | 'huge';
      },
    ];
    indexPlayer: number;
  };
  id: 0;
};

export type wsAttack = {
  type: 'attack';
  data: attackData;
  id: 0;
};

export type attackData = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number /* id of the player in the current game */;
};

export type wsRandomAttack = {
  type: 'randomAttack';
  data: {
    gameId: number;
    indexPlayer: number /* id of the player in the current game */;
  };
  id: 0;
};
