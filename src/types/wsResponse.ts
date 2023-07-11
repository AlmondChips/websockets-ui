export type wsResponse = { type: string; id: number } & (
  | wsRegResponse
  | wsCreateGameResponse
  | wsUpdateRoom
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
