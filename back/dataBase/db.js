"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
const games_1 = require("./games");
const rooms_1 = require("./rooms");
const users_1 = require("./users");
class dataBase {
}
exports.dataBase = dataBase;
dataBase.users = users_1.Users;
dataBase.rooms = rooms_1.Rooms;
dataBase.games = games_1.Games;
//# sourceMappingURL=db.js.map