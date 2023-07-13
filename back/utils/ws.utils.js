"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.parseMessageWithData = void 0;
const parseMessageWithData = (data) => {
    const parsedData = JSON.parse(data.toString());
    const result = {
        ...parsedData,
        data: parsedData.data ? JSON.parse(parsedData.data) : '',
    };
    return result;
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