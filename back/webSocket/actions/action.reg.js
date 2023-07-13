"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionReg = void 0;
const ws_utils_1 = require("../../utils/ws.utils");
const db_1 = require("../../dataBase/db");
const actionReg = (recivedMessage, wsClient) => {
    const { name, password } = recivedMessage.data;
    const newUser = {
        name,
        password,
        wins: 0,
    };
    try {
        db_1.dataBase.users.addUser(newUser);
    }
    catch (er) {
        const message = {
            type: 'reg',
            data: {
                name,
                error: true,
                errorText: er.message,
            },
            id: 0,
        };
        (0, ws_utils_1.sendMessage)(message, wsClient);
        return;
    }
    const message = {
        type: 'reg',
        data: { name, error: false },
        id: 0,
    };
    console.log('Response:', message);
    (0, ws_utils_1.sendMessage)(message, wsClient);
};
exports.actionReg = actionReg;
//# sourceMappingURL=action.reg.js.map