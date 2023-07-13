import { wsAddShip } from './wsRequest';

export type wsResponse = { type: string; id: number } & (
  | wsRegResponse
  | wsCreateGameResponse
  | wsUpdateRoom
  | wsAddShip
  | wsTurn
  | wsAttackResponse
  | wsFinish
);
export type wsData = wsRegData | wsCreateGameData;
type wsRegResponse = {
  data: wsRegData;
};

type wsRegData = {
  name: string;
  index?: number;
  error: boolean;
  errorText?: string;
};

export type wsCreateGameResponse = {
  data: wsCreateGameData;
};

type wsCreateGameData = {
  idGame: number;
  idPlayer: number;
};

type wsUpdateRoom = {
  data: wsRoom[];
};

export type wsRoom = {
  roomId: number;
  roomUsers: wsUser[];
};

export type wsUser = {
  name: string;
  index: number;
};

type wsTurn = {
  data: {
    currentPlayer: number;
  };
};

export type wsAttackResponse = {
  data: {
    position: {
      x: number;
      y: number;
    };
    currentPlayer: number /* id of the player in the current game */;
    status?: 'miss' | 'killed' | 'shot';
  };
};

type wsFinish = {
  data: {
    winPlayer: number;
  };
};

type wsUpdateWinners = {
  type: 'update_winners';
  data: [
    {
      name: string;
      wins: number;
    },
  ];
  id: 0;
};
