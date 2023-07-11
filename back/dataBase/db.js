"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBase = void 0;
class Users {
    static addUser(newUser) {
        const isNotUnique = this.users.find((user) => user.name === newUser.name);
        if (isNotUnique) {
            throw Error('User already exists!');
        }
        this.users.push(newUser);
    }
}
Users.users = [];
class dataBase {
}
exports.dataBase = dataBase;
dataBase.users = Users;
//# sourceMappingURL=db.js.map