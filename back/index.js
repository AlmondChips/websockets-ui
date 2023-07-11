"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ws = void 0;
const webSocketHandler_1 = require("./webSocket/webSocketHandler");
const index_1 = require("./http_server/index");
const ws_1 = require("ws");
const PORT = 8181;
const wsPort = 3000;
exports.ws = new ws_1.WebSocketServer({ port: wsPort }, () => {
    console.log('WebSocket server started on port', wsPort);
});
exports.ws.on('connection', webSocketHandler_1.onConnect);
console.log(`Start static http server on the ${PORT} port!`);
index_1.httpServer.listen(PORT);
//# sourceMappingURL=index.js.map