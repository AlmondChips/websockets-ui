"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const action_reg_1 = require("./action.reg");
const action_create_room_1 = require("./action.create_room");
exports.actions = new Map();
exports.actions.set('reg', action_reg_1.actionReg);
exports.actions.set('create_room', action_create_room_1.actionCreateRoom);
//# sourceMappingURL=actionsList.js.map