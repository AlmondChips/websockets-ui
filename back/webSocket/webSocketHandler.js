"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnect = void 0;
const ws_utils_1 = require("../utils/ws.utils");
const actionsList_1 = require("./actions/actionsList");
const onConnect = (wsClient, req) => {
    const cookies = req.headers.cookie;
    console.log(cookies);
    if (!cookies) {
        wsClient.send('Set-Cookie: sessionId=' + 123);
    }
    wsClient.on('message', (data) => {
        const recivedMessage = (0, ws_utils_1.parseMessageWithData)(data);
        if (recivedMessage) {
            const action = actionsList_1.actions.get(recivedMessage.type);
            if (action) {
                action(recivedMessage, wsClient);
            }
        }
        console.log('Message', recivedMessage);
    });
};
exports.onConnect = onConnect;
//# sourceMappingURL=webSocketHandler.js.map