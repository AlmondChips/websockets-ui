"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnect = void 0;
const ws_utils_1 = require("../utils/ws.utils");
const requestList_1 = require("./requests/requestList");
const sessionIdGen_1 = require("../utils/sessionIdGen");
const onConnect = (wsClient) => {
    const sessionId = (0, sessionIdGen_1.generateSessionId)();
    console.log(`Client with id(${sessionId}) connected.`);
    wsClient.on('message', (data) => {
        const recivedMessage = (0, ws_utils_1.parseMessageWithData)(data);
        if (recivedMessage) {
            const action = requestList_1.requests.get(recivedMessage.type);
            if (action) {
                action(recivedMessage, wsClient, sessionId);
            }
        }
        console.log('Request:', recivedMessage);
    });
    wsClient.on('close', () => {
        console.log(`Client with id(${sessionId}) disconnected.`);
    });
};
exports.onConnect = onConnect;
//# sourceMappingURL=webSocketHandler.js.map