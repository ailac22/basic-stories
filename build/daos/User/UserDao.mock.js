"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("@shared/functions");
const MockDao_mock_1 = __importDefault(require("../MockDb/MockDao.mock"));
class UserDao extends MockDao_mock_1.default {
    async getOne(email) {
        const db = await super.openDb();
        for (const user of db.users) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }
    async getAll() {
        const db = await super.openDb();
        return db.users;
    }
    async add(user) {
        const db = await super.openDb();
        user.id = (0, functions_1.getRandomInt)();
        db.users.push(user);
        await super.saveDb(db);
    }
    async update(user) {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === user.id) {
                db.users[i] = user;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }
    async delete(id) {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                db.users.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }
}
exports.default = UserDao;
