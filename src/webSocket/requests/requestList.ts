import { wsMessageTypes } from '../../types/wsTypes';
import { wsAction } from '../../types/wsAction';
import { actionReg } from './request.reg';
import { actionCreateRoom } from './request.create_room';
import { addUserToRoom } from './request.add_user_to_room';
import { addShips } from './request.add_ships';

export const requests = new Map<wsMessageTypes, wsAction>();
requests.set('reg', actionReg);
requests.set('create_room', actionCreateRoom);
requests.set('add_user_to_room', addUserToRoom);
requests.set('add_ships', addShips);
