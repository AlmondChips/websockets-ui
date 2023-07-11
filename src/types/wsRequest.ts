export type wsMessage = wsReg | wsCreateRoom | wsAddUserToRoom | wsAddShip;

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
