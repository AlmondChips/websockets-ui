import { wsMessageTypes } from '../../types/wsTypes';
import { wsAction } from '../../types/wsAction';
import { register } from './request.reg';
import { createRoom } from './request.create_room';
import { addUserToRoom } from './request.add_user_to_room';
import { addShips } from './request.add_ships';
import { attack } from './request.attack';

export const requests = new Map<wsMessageTypes, wsAction>();
requests.set('reg', register);
requests.set('create_room', createRoom);
requests.set('add_user_to_room', addUserToRoom);
requests.set('add_ships', addShips);
requests.set('attack', attack);
requests.set('randomAttack', attack);
