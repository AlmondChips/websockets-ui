"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessageWithData = exports.sendMessage = void 0;
const parseMessageWithData = (data) => {
    const parsedData = JSON.parse(data.toString());
    let result;
    if (parsedData.data) {
        result = { ...parsedData, data: JSON.parse(parsedData.data) };
        return result;
    }
};
exports.parseMessageWithData = parseMessageWithData;
const sendMessage = (data, client) => {
    if (data.data) {
        const result = { ...data, data: JSON.stringify(data.data) };
        client.send(JSON.stringify(result));
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=ws.utils.js.map